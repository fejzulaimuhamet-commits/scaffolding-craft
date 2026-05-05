import { Suspense, lazy } from "react";

const StudioInner = lazy(async () => {
  const [{ Studio }, { sanityConfig }] = await Promise.all([
    import("sanity"),
    import("@/sanity/config"),
  ]);
  return { default: () => <Studio config={sanityConfig} /> };
});

const StudioPage = () => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <Suspense fallback={<div style={{ padding: 24 }}>Studio wird geladen…</div>}>
      <StudioInner />
    </Suspense>
  </div>
);

export default StudioPage;
