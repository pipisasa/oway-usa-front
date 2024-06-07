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
        `${API_URL}/api/warehouses/product/list/?pagination_type=page_number&page=${
          currentPage === undefined ? 1 : currentPage
        }&page_size=6`,
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
    date_sent,
    date_arrived,
    is_parcels
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
    formData.append("date_sent", date_sent);
    formData.append("date_arrived", date_arrived);
    formData.append("is_parcels", !!is_parcels);

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/api/warehouses/product/create/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchWarehouses();
      setIsSuccess(true);
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWarehouse = async (id) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/api/warehouses/product/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchWarehouses();
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    warehouses,
    addWarehouses,
    deleteWarehouse,
    fetchWarehouses,
    error,
    isLoading,
    count,
  };
};

export default useWarehouses;
