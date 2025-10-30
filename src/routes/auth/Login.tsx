import Login from "@/components/auth/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/Login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
