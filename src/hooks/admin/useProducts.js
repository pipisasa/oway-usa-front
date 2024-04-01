import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";

const useProducts = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://18.222.184.72:8000/api/products/list/"
      );
      if (!response.ok)
        throw new Error("Не удалось загрузить список продуктов");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (title, link, imageFile) => {
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", imageFile);

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(
        "http://18.222.184.72:8000/api/products/add/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось добавить продукт");
      }

      await fetchProducts();
      setIsSuccess(true);
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `http://18.222.184.72:8000/api/products/delete_update/${productId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось удалить продукт");
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (productId, formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `http://18.222.184.72:8000/api/products/delete_update/${productId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось обновить продукт");
      }

      const updatedProduct = await response.json();
      setProducts((currentProducts) =>
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

  return {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    error,
    isLoading,
  };
};

export default useProducts;
