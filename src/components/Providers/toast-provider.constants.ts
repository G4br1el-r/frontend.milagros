import type { ToastPosition } from "react-hot-toast";
import { TOAST_DURATION_MS } from "@/lib/toast/toast.constants";

export const TOAST_POSITION: ToastPosition = "top-center";

export const TOAST_TOAST_OPTIONS = {
  duration: TOAST_DURATION_MS,
  style: {
    background: "#21130a",
    color: "#f7ecdc",
    border: "1px solid rgba(247, 236, 220, 0.12)",
    borderRadius: "9999px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: "0 20px 40px -20px rgba(33, 19, 10, 0.55)",
  },
};

export const TOAST_SUCCESS_STYLE = {
  iconTheme: {
    primary: "#c3924f",
    secondary: "#21130a",
  },
};

export const TOAST_ERROR_STYLE = {
  iconTheme: {
    primary: "#b1592f",
    secondary: "#f7ecdc",
  },
  style: {
    background: "#2a1710",
    border: "1px solid rgba(177, 89, 47, 0.35)",
  },
};
