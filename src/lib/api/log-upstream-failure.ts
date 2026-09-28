import { isAppError } from "@/lib/api-client";
import { SERVER_ERROR_MIN_STATUS } from "@/lib/http/http.constants";
export function logUpstreamFailure(route: string, error: unknown) {
  if (isAppError(error) && error.statusCode >= SERVER_ERROR_MIN_STATUS) {
    console.error(`[${route}] falha no upstream`, {
      status: error.statusCode,
      code: error.code,
    });
  }
}
