import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "@/lib/axiosInstance";

interface signUpData {
  username: string;
  email: string;
  password: string;
}

interface props {
  onSuccess?: () => void;
}

const useSignUp = ({ onSuccess }: props) => {
  const register = async (signUpData: signUpData) => {
    const { data } = await axios.post("/auth/register/", signUpData);
    return data;
  };
  return useMutation({
    mutationFn: async (data: signUpData) => {
      return await register(data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      onSuccess && onSuccess();
    },
  });
};

export default useSignUp;
