import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants";

const useCountries = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const fetchShops = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/countries/list/`);
      setCountries(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return {
    countries,
    error,
    isLoading,
  };
};

export default useCountries;
