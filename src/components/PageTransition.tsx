import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * Lightweight page transition: re-mounts on route change,
 * re-runs the .page-transition CSS animation (0.35s fade-up).
 */
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
};
