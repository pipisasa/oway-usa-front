import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const useCategories = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchShops = async () => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/categories/list/`);
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteCategories = async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.delete(
        `${API_URL}/api/categories/delete/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setCategories((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
      fetchShops();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const updateCategories = async (productId, formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.patch(
        `${API_URL}/api/categories/update/${productId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchShops();
      const updatedProduct = response.data;
      setCategories((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const addCategories = async (name) => {
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("name", name);
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/api/categories/create/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      await fetchShops();
      setIsSuccess(true);
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories,
    addCategories,
    deleteCategories,
    updateCategories,
    error,
    setCategories,
    isLoading,
  };
};

export default useCategories;
