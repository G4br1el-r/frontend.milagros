import { isAppError } from "@/lib/api-client";
import { invalidateToken } from "@/lib/auth/token";
export async function withAuthRetry<T>(request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (isAppError(error) && error.statusCode === 401) {
      await invalidateToken();
      return request();
    }
    throw error;
  }
}
