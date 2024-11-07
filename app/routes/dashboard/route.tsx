import { Outlet } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getUser } from "~/utils/session.server";

export default function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};
