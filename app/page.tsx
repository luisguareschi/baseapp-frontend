"use client";
import useCurrentUser from "@/queries/auth/useCurrentUser";
import { useRouter } from "next/navigation";
import Spinner from "@/components/common/spinner";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  if (!isLoading && !user) {
    router.replace("/login");
  }

  if (user) {
    router.replace("/home");
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner size={40} baseColor="blue-500" trackColor="white" />
    </div>
  );
}
