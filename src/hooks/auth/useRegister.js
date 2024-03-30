// hooks/useRegister.js
import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const response = await axios.post(
        "http://18.222.184.72:8000/api/users/register/",
        {
          first_name,
          last_name,
          email,
          phone_number,
          password,
          password2,
        }
      );

      // Обработка успешного ответа
      // Например, можно перенаправить пользователя на страницу входа или показать сообщение об успешной регистрации
      console.log("Успешная регистрация:", response.data);

      // Здесь можно добавить дополнительную логику, например, перенаправление на страницу входа
    } catch (error) {
      console.error("Ошибка регистрации:", error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
