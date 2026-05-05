import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <section className="container-w py-16 lg:py-24">
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-display font-bold uppercase tracking-[0.2em] text-primary mb-4">
          Coming Soon
        </span>
        <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-steel leading-tight">
          {title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {description ??
            "Diese Seite befindet sich in Arbeit und ist bald verfügbar. In der Zwischenzeit erreichen Sie uns jederzeit telefonisch oder über das Kontaktformular."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/kontakt" className="btn-primary inline-flex items-center gap-2">
            Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 font-display font-bold uppercase tracking-wider text-xs border border-border text-steel hover:bg-muted transition-colors"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
};
