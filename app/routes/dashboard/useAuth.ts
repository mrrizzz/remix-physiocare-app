import { useRouteLoaderData } from "@remix-run/react";
import type { UserData } from "~/types/auth";

interface LoaderData {
  user: UserData;
}
export function useAuth() {
  const data = useRouteLoaderData("routes/dashboard") as LoaderData;
  console.log("ini dari use auth: ", data);
  return {
    user: data?.user,
    isAuthenticated: !!data?.user,
  };
}
