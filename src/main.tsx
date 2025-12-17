import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { ErrorBoundary } from "react-error-boundary";
import { logger } from "./services/logger.ts";
import AppRouter from "./router/index.tsx";
import { HelmetProvider } from "react-helmet-async";

import { OverlayProvider } from "overlay-kit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="flex h-screen flex-col items-center justify-center bg-white p-4 text-center">
          <h1 className="text-xl font-bold text-red-600">시스템 치명적 오류</h1>
          <p className="mb-4 text-gray-500 text-sm">앱을 실행할 수 없습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-black"
          >
            새로고침
          </button>
        </div>
      }
      onError={logger.error}
      onReset={() => window.location.reload()}
    >
      <HelmetProvider>
        <OverlayProvider>
          <AppRouter />
        </OverlayProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
