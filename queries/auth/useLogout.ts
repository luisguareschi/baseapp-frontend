import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.replace("/login");
  };

  return { logout };
};

export default useLogout;
