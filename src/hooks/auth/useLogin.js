import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email, password) => {
    setIsLoading(true);

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
        setCookie("refreshToken", data.refresh);

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
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setCookie("accessToken", data.access);
      } else {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        router.push("/auth/login");
      }
    } catch (error) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      refreshAccessToken();
    }
  }, []);

  return { login, error, isLoading, refreshAccessToken };
};

export default useLogin;
