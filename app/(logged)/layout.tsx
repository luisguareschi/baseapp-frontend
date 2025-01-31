"use client";
import useCurrentUser from "@/queries/auth/useCurrentUser";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  if (!isLoading && !user) {
    router.replace("/login");
  }

  return <>{children}</>;
}
