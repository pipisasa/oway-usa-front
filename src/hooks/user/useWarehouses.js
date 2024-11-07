import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

const useWarehouses = (currentPage) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);

  const fetchWarehouses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get(
        `${API_URL}/api/my_warehouse/list/?pagination_type=page_number&page=${
          currentPage === undefined ? 1 : currentPage
        }&page_size=7`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setProducts(response.data.results);
      setTotal(response.data?.total_pages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addWarehouses = async (data) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/api/my_warehouse/add/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      fetchWarehouses();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWarehouses = async (productId) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/api/my_warehouse/delete/${productId}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateWarehouses = async (productId, formData) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `${API_URL}/api/my_warehouse/update/${productId}/`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? { ...product, ...response.data } : product
        )
      );
      fetchWarehouses();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return {
    products,
    addWarehouses,
    fetchWarehouses,
    deleteWarehouses,
    updateWarehouses,
    total,
    isLoading,
    error,
  };
};

export default useWarehouses;
