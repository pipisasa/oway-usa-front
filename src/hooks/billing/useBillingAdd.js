import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../utils/cookieHelpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useBillingAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const billingAdd = async ({ number, end_date, full_name, cvv }) => {
    setIsLoading(true);
    setError(null);
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setError("No access token found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/billing/add/`,
        {
          number,
          end_date,
          full_name,
          cvv,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Ошибка:", error?.response?.data);
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { billingAdd, isLoading, error };
};
