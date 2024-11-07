import { useState, useCallback } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

export const useMainWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = getCookie("accessToken");

  const fetchWarehouses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/warehouses/list/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error("Не удалось загрузить данные складов");
      const data = await response.json();
      setWarehouses(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const createWarehouse = async (warehouseData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/warehouses/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(warehouseData),
      });
      if (!response.ok) throw new Error("Ошибка при создании склада");
      await fetchWarehouses();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateWarehouse = async (id, warehouseData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/warehouses/update/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(warehouseData),
      });
      if (!response.ok) throw new Error("Ошибка при обновлении склада");
      await fetchWarehouses();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWarehouse = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/warehouses/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchWarehouses();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    warehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    fetchWarehouses,
    loading,
    error,
  };
};
