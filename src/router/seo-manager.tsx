// src/components/seo-route-manager.tsx
import { useMatches } from "react-router";
import SeoHead from "@/components/seo-head";

const SeoRouteManager = () => {
  const matches = useMatches();
  const currentMatch = matches.at(-1);
  const seoConfig = (currentMatch?.handle as { seo?: any })?.seo;

  return <SeoHead {...seoConfig} />;
};

export default SeoRouteManager;
