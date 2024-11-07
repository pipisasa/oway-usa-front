import { getCookie } from "@/utils/cookieHelpers";
import { useState } from "react";
import { API_URL } from "@/constants";

const usePurchase = () => {
  const initialState = {
    full_name: "",
    url: "",
    name_of_purchase: "",
    count: "",
    email: "",
    description: "",
    telegram: "",
    phone_number: "",
    purchase_image: null,
    purchase_image_2: null,
  };

  const [purchaseData, setPurchaseData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setIsSubmitted(false);
    if (
      (id === "purchase_image" || id === "purchase_image_2") &&
      files.length
    ) {
      setPurchaseData({ ...purchaseData, [id]: files[0] });
    } else {
      setPurchaseData({ ...purchaseData, [id]: value });
    }
  };

  const submitPurchase = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "purchase_image" || key === "purchase_image_2") {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    const token = getCookie("accessToken");

    try {
      const response = await fetch(`${API_URL}/api/purchase/add/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Ошибка при отправке данных");
      setPurchaseData(initialState);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleChange, submitPurchase, purchaseData, isSubmitted, isLoading };
};

export default usePurchase;
