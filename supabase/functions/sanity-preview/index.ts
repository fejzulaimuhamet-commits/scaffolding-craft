import { createClient } from "https://esm.sh/@sanity/client@7.22.0";
import { validatePreviewUrl } from "https://esm.sh/@sanity/preview-url-secret@4.0.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("SANITY_TOKEN");
    if (!token) {
      return new Response(
        JSON.stringify({ valid: false, error: "Missing SANITY_TOKEN" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const client = createClient({
      projectId: "d683vf4r",
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token,
    });

    const { isValid, redirectTo = "/" } = await validatePreviewUrl(
      client,
      req.url,
    );

    if (!isValid) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid secret" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Return token to caller (only after secret validation). The caller is
    // the live site running in the Sanity Presentation iframe — it stores
    // the token in sessionStorage and uses it for draft queries.
    return new Response(
      JSON.stringify({ valid: true, token, redirectTo }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ valid: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
