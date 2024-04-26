import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useMyRequests = (currentPage) => {
  const [data, setData] = useState({ results: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { data, isLoading, error };
};

export default useMyRequests;
