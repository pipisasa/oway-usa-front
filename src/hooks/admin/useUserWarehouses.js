import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

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
        `${API_URL}/api/my_warehouse/list_for_admin/`,
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
      await axios.delete(`${API_URL}/api/my_warehouse/delete/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
