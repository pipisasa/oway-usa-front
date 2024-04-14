import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useWarehouses = (currentPage) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [count, setCount] = useState(0);
  
  const fetchWarehouses = async () => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_URL}/api/warehouses/list/?pagination_type=page_number&page=${currentPage === undefined ? 1 : currentPage}&page_size=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      setWarehouses(data);
      setCount(data.count);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const addWarehouses = async (
    name,
    address,
    weight,
    track_number,
    price,
    country,
    status,
    image,
    comments,
    unique_id_user,
    url,
    color,
    count,
    articul
  ) => {
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("weight", weight);
    formData.append("track_number", track_number);
    formData.append("price", price);
    formData.append("country", country);
    formData.append("status", status);
    formData.append("image", image);
    formData.append("comments", comments);
    formData.append("unique_id_user", unique_id_user);
    formData.append("url", url);
    formData.append("color", color);
    formData.append("count", count);
    formData.append("articul", articul);

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/api/warehouses/create/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.location.reload();
      await fetchWarehouses();
      setIsSuccess(true);
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    warehouses,
    addWarehouses,
    fetchWarehouses,
    error,
    isLoading,
    count,
  };
};

export default useWarehouses;
