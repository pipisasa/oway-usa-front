import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";

const useRequests = (currentPage) => {
  const [data, setData] = useState({ results: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getCookie("accessToken");
      const url = `http://18.222.184.72:8000/api/purchase/list/?page=${currentPage}`;
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

  const updateRequest = async (id, updatedData) => {
    const accessToken = getCookie("accessToken");
    try {
      const response = await fetch(
        `http://18.222.184.72:8000/api/purchase/update/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return { data, isLoading, error, updateRequest };
};

export default useRequests;
