import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";

interface loginDataProps {
  email: string;
  password: string;
}

interface ILoginResponse {
  access: string;
  refresh: string;
}

interface props {
  onSuccess?: () => void;
}

const useLogin = ({ onSuccess }: props) => {
  const login = async (loginData: loginDataProps) => {
    const { data } = await axios.post("/auth/login/", loginData);
    return data as ILoginResponse;
  };

  return useMutation({
    mutationFn: async (loginData: loginDataProps) => {
      return await login(loginData);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      console.log("Login success");
      onSuccess && onSuccess();
    },
  });
};

export default useLogin;
