import { useState } from "react";
import { setCookie } from "@/utils/cookieHelpers";
import { useRouter } from "next/router";

const useLogin = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "http://18.222.184.72:8000/api/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCookie("accessToken", data.access);
        router.push("/user");
      } else {
        setError(data.detail || "Произошла ошибка при авторизации");
      }
    } catch (error) {
      setError("Произошла ошибка при авторизации");
    }
  };

  return { login, error };
};

export default useLogin;
