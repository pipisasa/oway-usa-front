import React, { useState } from "react";
import axios from "axios";
// import Form from "./Form";
import Illinois from "@/pages/size-chart/Illinois";

function useIllinois() {
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    cargo_weight: 0,
    email: "",
    telegram: "",
    whatsapp: "",
    status: true,
  });
  const [isLoading, setIsLoading] = useState(false); // Добавляем состояние isLoading для отслеживания загрузки

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Устанавливаем isLoading в true перед отправкой запроса

    try {
      const response = await axios.post(
        "https://api-owayusa.com/api/otside_of_illinois/add/",
        formData
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Вне зависимости от результата запроса, устанавливаем isLoading в false
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
}

export default useIllinois;
