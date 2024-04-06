import { useState } from "react";

const usePurchase = () => {
  const initialState = {
    full_name: "",
    url: "",
    name_of_purchase: "",
    articul: "",
    count: "",
    color: "",
    description: "",
    telegram: "",
    phone_number: "",
    purchase_image: null,
  };

  const [purchaseData, setPurchaseData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false); // Для управления сообщением об успешной отправке

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setIsSubmitted(false); // Сбросить сообщение об отправке при изменении формы
    if (id === "purchase_image") {
      setPurchaseData({ ...purchaseData, [id]: files[0] });
    } else {
      setPurchaseData({ ...purchaseData, [id]: value });
    }
  };

  const submitPurchase = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'purchase_image') {
        formData.append(key, data[key][0]); // Добавляем только первый файл из массива файлов
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch(
          "http://18.222.184.72:8000/api/purchase/add/",
          {
            method: "POST",
            body: formData,
          }
      );
      if (!response.ok) throw new Error("Ошибка при отправке данных");
      setPurchaseData(initialState); // Сброс формы
      setIsSubmitted(true); // Показать сообщение об успешной отправке
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };


  return { handleChange, submitPurchase, purchaseData, isSubmitted };
};

export default usePurchase;
