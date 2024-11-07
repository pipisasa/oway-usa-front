import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";
import { API_URL } from "@/constants";

const useShops = (selectedCategory, selectedCountry) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchShops(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchShops(selectedCountry);
  }, [selectedCountry]);

  const fetchShops = async () => {
    setIsLoading(true);
    setError(null);

    let categoryQueryParam = selectedCategory
      ?.map((category) => `category=${category}`)
      .join("&");
    let queryParams = "";

    if (selectedCountry) {
      queryParams = `?${categoryQueryParam}${
        selectedCategory.length > 0 ? "&" : ""
      }country=${selectedCountry}`;
    } else {
      queryParams = `?${categoryQueryParam}`;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/catalog/sites/list/${queryParams}`
      );

      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const addShops = async (name, category, country, logo, description, url) => {
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("country", country);
    formData.append("logo", logo);
    formData.append("description", description);
    formData.append("url", url);

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/api/catalog/sites/create/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.location.reload();
      await fetchShops();
      setIsSuccess(true);
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteShops = async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.delete(
        `${API_URL}/api/catalog/sites/delete/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProducts((currentProducts) => {
        // Проверяем, что currentProducts действительно является массивом
        if (Array.isArray(currentProducts)) {
          return currentProducts.filter((product) => product.id !== productId);
        } else {
          // В случае, если это не массив, выводим ошибку или обрабатываем иначе
          console.error("Expected an array but got:", typeof currentProducts);
          return []; // или возвращаем currentProducts без изменений
        }
      });
      fetchShops();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateShops = async (productId, formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.patch(
        `${API_URL}/api/catalog/sites/update/${productId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchShops();
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
    addShops,
    deleteShops,
    fetchShops,
    updateShops,
    error,
    isLoading,
  };
};

export default useShops;
