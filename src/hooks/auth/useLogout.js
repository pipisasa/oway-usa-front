import { deleteCookie } from "@/utils/cookieHelpers";
import { useRouter } from "next/router";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    deleteCookie("accessToken");
    router.push("/");
  };

  return logout;
};

export default useLogout;
