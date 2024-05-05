import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";

const useUserWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get(
        "https://api-owayusa.com/api/my_warehouse/list_for_admin/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setWarehouses(response.data.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteWarehouse = async (id) => {
    const newWarehouses = warehouses.filter((warehouse) => warehouse.id !== id);
    setWarehouses(newWarehouses);

    try {
      const accessToken = getCookie("accessToken");
      await axios.delete(
        `https://api-owayusa.com/api/my_warehouse/delete/${id}/`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } catch (err) {
      setError(err);
      setWarehouses(warehouses);

    }
  };

  return { warehouses, loading, error, deleteWarehouse };
};

export default useUserWarehouses;