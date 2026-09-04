"use client";

import { Toaster } from "react-hot-toast";
import {
  TOAST_ERROR_STYLE,
  TOAST_POSITION,
  TOAST_SUCCESS_STYLE,
  TOAST_TOAST_OPTIONS,
} from "./toast-provider.constants";

export function ToastProvider() {
  return (
    <Toaster
      position={TOAST_POSITION}
      toastOptions={{
        ...TOAST_TOAST_OPTIONS,
        success: TOAST_SUCCESS_STYLE,
        error: TOAST_ERROR_STYLE,
      }}
    />
  );
}
