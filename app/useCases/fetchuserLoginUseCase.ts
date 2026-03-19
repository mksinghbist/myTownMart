import type { ILoginPayload, ILoginResponse } from "~/domain/interface";
import { useCustomFetch } from "~/composables/useRestAPI";

export const fetchUserLoginUseCase = async (
  payload: ILoginPayload
): Promise<ILoginResponse> => {
  const config = useRuntimeConfig();
  const { request } = useCustomFetch();

  try {
    const response = await request<ILoginResponse>(
      config.public.loginUser,
      {
        method: "POST",
        payload,
      }
    );

    return response?.data || ""; // ✅ unwrap here
  } catch (error: any) {
    throw new Error(error?.data?.message || "Login failed");
  }
};