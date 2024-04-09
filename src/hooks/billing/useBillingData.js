import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useBillingData = () => {
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/billing/my_billings/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBillingData((prevData) => response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const billingAdd = async ({ number, end_date, full_name, cvv }) => {
    setLoading(true);
    setError(null);
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setError("No access token found");
      setLoading(false);
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
      setBillingData((prevData) => [...prevData, response.data]);
      window.location.reload();
    } catch (error) {
      console.error("Ошибка:", error?.response?.data);
      setError(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteBilling = async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.delete(
        `${API_URL}/api/billing/delete/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBillingData((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
      await fetchUserData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBilling = async (productId, formData) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.patch(
        `${API_URL}/api/billing/update/${productId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const updatedProduct = response.data;
      setBillingData((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        )
      );
      window.location.reload();
      await fetchUserData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    billingAdd,
    fetchUserData,
    billingData,
    deleteBilling,
    updateBilling,
    loading,
    error,
  };
};

export default useBillingData;
