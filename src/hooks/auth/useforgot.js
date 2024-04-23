import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useForgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const sendCodeToEmail = async (email) => {
    try {
      const response = await axios.post(
        `https://api-owayusa.com/api/users/forgot_pass_send_activation_code/`,
        { email }
      );
      console.log("Код отправлен на почту:", response?.data);
    } catch (error) {
      console.error("Ошибка отправки кода на почту:", error?.response?.data);
      setError(error?.response?.data);
    }
  };

  const confirmEmail = async (email) => {
    try {
      console.log("Email подтверждён:", email);
    } catch (error) {
      console.error("Ошибка подтверждения email:", error);
      setError(error);
    }
  };

  const forgot = async ({ email, code, password, password2 }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/users/forgot_pass_complete/`,
        {
          email,
          code,
          password,
          password2,
        }
      );

      console.log("Успешная смена пароля:", response?.data);
      router.push("/");
    } catch (error) {
      console.error("Ошибка смены пароля:", error?.response?.data);
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendCodeToEmail, confirmEmail, forgot, isLoading, error };
};
