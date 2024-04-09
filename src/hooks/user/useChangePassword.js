import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../utils/cookieHelpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const changePass = async ({
    old_password,
    new_password,
    confirm_new_password,
  }) => {
    setIsLoading(true);
    setError(null);
    const accessToken = getCookie("accessToken");
    try {
      const response = await axios.post(
        `${API_URL}/api/users/change_password/`,
        {
          old_password,
          new_password,
          confirm_new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Ошибка:", error?.response?.data);
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { changePass, isLoading, error };
};
export default useChangePassword;
