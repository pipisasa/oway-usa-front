import { useState, useEffect } from "react";

const useSites = () => {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSites = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://api-owayusa.com/api/catalog/sites/list/"
        );
        if (!response.ok) {
          throw new Error("Что-то пошло не так при загрузке данных о сайтах.");
        }
        const data = await response.json();
        setSites(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSites();
  }, []);

  return { sites, isLoading, error };
};

export default useSites;
