import type { ILoginPayload, IUser } from "~/domain/interface";
import { fetchUserLoginUseCase } from "~/useCases/fetchuserLoginUseCase";

export const useAuth = () => {
  const user = useState<IUser | null>("auth_user", () => null);

  const isLoggedIn = computed(() => !!user.value);

  const login = async (credentials: ILoginPayload) => {
    const response = await fetchUserLoginUseCase(credentials);

    user.value = response.data?.user; // Only store user
  };

  const logout = async () => {
    user.value = null;
    navigateTo("/");
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
};