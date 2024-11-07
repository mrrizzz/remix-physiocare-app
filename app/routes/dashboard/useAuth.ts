import { useRouteLoaderData } from "@remix-run/react";
import type { UserData } from "~/types/auth";

interface LoaderData {
  user: UserData;
}
export function useAuth() {
  const data = useRouteLoaderData("dashboard") as LoaderData;
  return {
    user: data?.user,
    isAuthenticated: !!data?.user,
  };
}
