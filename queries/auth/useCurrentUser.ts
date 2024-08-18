import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import axios from "@/lib/axiosInstance";
import { IUser } from "@/queries/auth/types";

const useCurrentUser = () => {
  const getUser = async (): Promise<IUser> => {
    const { data } = await axios.get("users/me");
    return data;
  };
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.me],
    queryFn: async () => {
      return await getUser();
    },
    enabled: !!localStorage.getItem("token"),
  });
  return {
    user: data,
    ...rest,
  };
};

export default useCurrentUser;
