import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

const useMyRequests = (currentPage) => {
  const [data, setData] = useState({ results: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getCookie("accessToken");
      const url = `${API_URL}/api/purchase/my_purchases/?page=${currentPage}`;
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

    fetchData();
  }, [currentPage]);

  const deleteRequest = async (id) => {
    setIsDeleting(true);
    const accessToken = getCookie("accessToken");
    try {
      const response = await fetch(`${API_URL}/api/purchase/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete the request");
      }

      const updatedData = data.results.filter((request) => request.id !== id);
      setData({ ...data, results: updatedData });
    } catch (error) {
      setDeleteError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { data, isLoading, error, deleteError, deleteRequest, isDeleting };
};

export default useMyRequests;
