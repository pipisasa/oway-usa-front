import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useRequests = (currentPage, initialFilters) => {
  const [data, setData] = useState({ results: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const [error, setError] = useState(null);

  const fetchData = async (newFilters = {}) => {
    const accessToken = getCookie("accessToken");
    const mergedFilters = {
      ...filters,
      ...newFilters,
    };
    const queryParams = Object.entries(mergedFilters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    const url = `${API_URL}/api/purchase/list/?page=${currentPage}&${queryParams}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequest = async (id, updatedData) => {
    const accessToken = getCookie("accessToken");
    try {
      const response = await fetch(`${API_URL}/api/purchase/update/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: updatedData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update. Status: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const deleteRequest = async (id) => {
    const accessToken = getCookie("accessToken");
    try {
      const response = await fetch(`${API_URL}/api/purchase/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete. Status: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return {
    data,
    isLoading,
    error,
    updateRequest,
    deleteRequest,
    setFilters,
    fetchData,
  };
};

export default useRequests;
