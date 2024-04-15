import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useWarehouses = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchWarehouses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = axios.get(`${API_URL}/api/my_warehouse/list/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data,'tret')
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
};

  useEffect(() => {
    fetchWarehouses();
  }, []);

 const addWarehouses = async (courier_service, tracking_number, warehouse) => {
    const accessToken = getCookie("accessToken");

    setIsLoading(true);
    setError(null);

    try {
        const response = await axios.post(
            `${API_URL}/api/my_warehouse/add/`,
            {
                 courier_service,
                 tracking_number,
                warehouse,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("dvsfs");
        //   window.location.reload();
        await fetchShops();

    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
};


  const deleteWarehouses = async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.delete(
        `${API_URL}/api/my_warehouse/delete/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
      fetchWarehouses();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateWarehouses = async (productId, formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.patch(
        `${API_URL}/api/my_warehouse/update/${productId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchWarehouses();
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
    addWarehouses,
    deleteWarehouses,
    fetchWarehouses,
    updateWarehouses,
    error,
    isLoading,
  };
};

export default useWarehouses;
