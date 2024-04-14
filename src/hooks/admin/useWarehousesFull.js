import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useWarehousesFull = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [count, setCount] = useState(0);

  const fetchWarehouses = async () => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_URL}/api/add_user_for_admin/list/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      setWarehouses(data);
      setCount(data.count);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);


  return {
    warehouses,
    error,
    isLoading,
    count,
  };
};

export default useWarehousesFull;
