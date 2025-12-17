import { logEvent } from "firebase/analytics";
import { analytics } from "../lib/firebase";
import type { ErrorInfo } from "react";

const sendLog = (logData: { type: string; logId: string; params?: object }) => {
  const commonLogData = {
    timestamp: new Date().toISOString(),
    // userId: 'test-user',
  };
  const finalLogData = {
    ...commonLogData,
    ...logData,
  };

  if (import.meta.env.MODE === "development") {
    console.log("[로그]", finalLogData);
  } else if (analytics) {
    logEvent(analytics, logData.logId, {
      category: logData.type,
      ...(logData.params || {}),
    });
  }
};

interface ScreenLogParams {
  logId: string;
  params: {
    title: string;
  };
}
interface ClickLogParams {
  logId: string;
  params: {
    title: string;
    button: string;
  };
}
interface PopupLogParams {
  logId: string;
  params: {
    title: string;
    message: string;
  };
}
interface ActionLogParams {
  logId: string;
  params?: object;
}

export const logger = {
  screen: (params: ScreenLogParams) => {
    sendLog({ type: "screen", ...params });
  },
  click: (params: ClickLogParams) => {
    sendLog({ type: "click", ...params });
  },
  popup: (params: PopupLogParams) => {
    sendLog({ type: "popup", ...params });
  },
  action: (params: ActionLogParams) => {
    sendLog({ type: "action", ...params });
  },
  error: (error: Error, info?: ErrorInfo) => {
    sendLog({
      type: "error",
      logId: LogId.ERROR,
      params: {
        errorMessage: error.message,
        componentStack: info?.componentStack ?? "",
        stackTrace: error.stack ?? "",
      },
    });
  },
};

export const LogId = {
  APP_SCREEN: "app",
  SAMPLE_CLICK: "sample_click",
  SAMPLE_POP_UP: "sample_pop_up",
  SAMPLE_CUSTOM_ACTION: "sample_custom_pop_up",
  ERROR: "error",
  DB_CREATE: "db_create",
  DB_UPDATE: "db_update",
  DB_DELETE: "db_delete",
} as const;
export type LogIdType = (typeof LogId)[keyof typeof LogId];
