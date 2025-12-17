// layouts/root-layout.tsx
import { logger, LogId } from "@/services/logger";
import { useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router";
import SeoRouteManager from "./seo-manager";

export default function RootWrapper() {
  return (
    <>
      <RouteLogger />
      <ScrollRestoration />
      <SeoRouteManager />
      <Outlet />
    </>
  );
}

function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    logger.screen({
      logId: LogId.APP_SCREEN,
      params: {
        title: location.pathname,
      },
    });
  }, [location.pathname]);

  return null;
}
