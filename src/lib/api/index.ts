import { createApiClient } from "@/lib/api-client";
import { getValidToken } from "@/lib/auth/token";
import { requireEnv } from "@/lib/utils/require-env";

export const api = createApiClient({
  baseUrl: requireEnv("API_URL"),
  getToken: getValidToken,
});
