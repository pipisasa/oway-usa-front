import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";

const useUserWarehouses = (initialFilters = {}) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    fetchWarehouses(filters);
  }, [filters]);

  const fetchWarehouses = async (filters) => {
    setLoading(true);
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get(
        "https://api-owayusa.com/api/my_warehouse/list_for_admin/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: filters,
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
    try {
      const accessToken = getCookie("accessToken");
      await axios.delete(
        `https://api-owayusa.com/api/my_warehouse/delete/${id}/`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setWarehouses((currentWarehouses) =>
        currentWarehouses.filter((warehouse) => warehouse.id !== id)
      );
    } catch (err) {
      setError(err);
    }
  };

  return { warehouses, loading, error, setFilters, deleteWarehouse };
};

export default useUserWarehouses;
