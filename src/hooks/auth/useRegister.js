import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { API_URL } from "@/constants";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const register = async ({
    first_name,
    last_name,
    email,
    phone_number,
    password,
    password2,
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/users/register/`, {
        first_name,
        last_name,
        email,
        phone_number,
        password,
        password2,
      });

      router.push("/auth/account-activation");
    } catch (error) {
      console.error("Ошибка регистрации:", error?.response?.data);
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
