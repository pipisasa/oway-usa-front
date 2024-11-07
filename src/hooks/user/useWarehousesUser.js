import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";
import { API_URL } from "@/constants";

const useWarehousesUser = (currentPage) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  const fetchWarehouses = async () => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_URL}/api/warehouses/my/?pagination_type=page_number&page=${
          currentPage === undefined ? 1 : currentPage
        }&page_size=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setWarehouses(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, [currentPage]); // Перезагрузка при изменении currentPage

  return {
    warehouses,
    fetchWarehouses,
    error,
    isLoading,
  };
};

export default useWarehousesUser;
