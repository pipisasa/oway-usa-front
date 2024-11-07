import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";
import { API_URL } from "@/constants";

const useNotification = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchNotification = async () => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/notifications/list/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const addNotification = async (title, description, icon) => {
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("icon", icon);

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/api/notifications/create_notification/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      await fetchNotification();
      setIsSuccess(true);
      window.location.reload();
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotification = async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.delete(
        `${API_URL}/api/notifications/delete_notification/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
      fetchNotification();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotification = async (productId, formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.patch(
        `${API_URL}/api/notifications/update_notification/${productId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchNotification();
      const updatedProduct = response.data;
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        )
      );
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    addNotification,
    deleteNotification,
    updateNotification,
    error,
    isLoading,
  };
};

export default useNotification;
