import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import axios from "@/lib/axiosInstance";
import { IUser } from "@/queries/auth/types";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const getUser = async (): Promise<IUser> => {
    const { data } = await axios.get("users/me");
    return data;
  };
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.me],
    queryFn: async () => {
      return await getUser();
    },
    enabled: !!accessToken,
  });
  return {
    user: data,
    ...rest,
  };
};

export default useCurrentUser;
