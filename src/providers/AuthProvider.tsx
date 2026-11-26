import { createContext, useContext, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  loginApi,
  logoutApi,
  refreshApi,
  type AuthResponse,
  type LoginData,
} from "../api/auth.api";
import { setAuthToken } from "../api/authToken";

type AuthContextValue = {
  user: AuthResponse["user"] | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  loginError: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
};


const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const sessionQuery = useQuery<AuthResponse | null>({
    queryKey: ["auth", "session"] ,
    queryFn: async () => {
      const session = await refreshApi();
      setAuthToken(session.accessToken);
      return session;
    },
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (session) => {
      await queryClient.cancelQueries({ queryKey: ["auth", "session"]  });
      setAuthToken(session.accessToken);
      queryClient.setQueryData(["auth", "session"] , session);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSettled: async () => {
      await queryClient.cancelQueries({ queryKey: ["auth", "session"]  });
      setAuthToken(null);
      queryClient.setQueryData(["auth", "session"] , null);

      // Не оставляем данные предыдущего пользователя в кеше после выхода.
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== "auth",
      });
    },
  });

  const login = async (data: LoginData) => {
    loginMutation.reset();
    await loginMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const user = sessionQuery.data?.user ?? null;
  const loginError = loginMutation.error
    ? loginMutation.error instanceof Error
      ? loginMutation.error.message
      : "Не удалось выполнить вход"
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isAuthLoading: sessionQuery.isPending,
        loginError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  return context;
}
