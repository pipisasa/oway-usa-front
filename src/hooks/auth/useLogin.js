import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, getCookie } from "@/utils/cookieHelpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useLogin = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setCookie("accessToken", data.access);

        if (data?.is_admin) {
          setCookie("isAdmin", "true");
          router.push("/admin");
        } else {
          router.push("/user");
        }
      } else {
        setError(data.detail || "Произошла ошибка при авторизации");
      }
    } catch (error) {
      setError("Произошла ошибка при авторизации");
    }
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
    }
  }, []);

  return { login, error };
};

export default useLogin;
