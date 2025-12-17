import { useEffect } from "react";
import { useRouteError, isRouteErrorResponse } from "react-router";
import { logger } from "@/services/logger";
import type { ErrorInfo } from "react";

const RouterErrorFallback = () => {
  const error = useRouteError();
  const isDev = import.meta.env.DEV;

  // 1. 에러 메시지 UI용 데이터 정제
  let errorMessage = "알 수 없는 오류가 발생했습니다.";
  let errorStack = null;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack;
  }

  useEffect(() => {
    let errorToLog: Error;

    if (error instanceof Error) {
      errorToLog = error;
    } else if (isRouteErrorResponse(error)) {
      errorToLog = new Error(
        `Route Error: ${error.status} ${error.statusText}`
      );
    } else {
      errorToLog = new Error(JSON.stringify(error));
    }

    const mockInfo: ErrorInfo = {};

    logger.error(errorToLog, mockInfo);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white text-center px-6">
      <div className="text-2xl font-semibold text-gray-800">
        문제가 발생했어요.
      </div>
      <p className="text-gray-600">
        잠시 후 다시 시도해주세요. 계속 발생하면 관리자에게 문의해주세요.
      </p>

      {isDev && (
        <div className="mt-2 max-w-xl text-left">
          <p className="text-red-600 font-bold">{errorMessage}</p>
          {errorStack && (
            <pre className="whitespace-pre-wrap text-sm text-red-500 bg-red-50 border border-red-200 rounded-md p-3 mt-2 overflow-auto max-h-60">
              {errorStack}
            </pre>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          새로 고침
        </button>
      </div>
    </div>
  );
};

export default RouterErrorFallback;
