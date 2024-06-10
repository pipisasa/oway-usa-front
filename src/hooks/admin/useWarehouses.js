import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useWarehouses = (currentPage, initialFilters = {}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState(initialFilters);

  const fetchWarehouses = async (newFilters = {}) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);

    const mergedFilters = { ...filters, ...newFilters };

    const queryString = Object.keys(mergedFilters)
      .map((key) => `${key}=${encodeURIComponent(mergedFilters[key])}`)
      .join("&");

    try {
      const response = await axios.get(
        `${API_URL}/api/warehouses/product/list/?pagination_type=page_number&page=${
          currentPage === undefined ? 1 : currentPage
        }&page_size=6&${queryString}`,
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
  }, [currentPage, filters]);

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
    is_parcels,
    country_of_origin,
    country_of_destination
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
    formData.append("country_of_origin", parseInt(country_of_origin, 10));
    formData.append(
      "country_of_destination",
      parseInt(country_of_destination, 10)
    );

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

  const deleteWarehouse = async (ids) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    try {
      await axios.delete(
        `${API_URL}/api/warehouses/product/delete/`,
        { id: ids },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
    setFilters,
    error,
    isLoading,
    count,
  };
};

export default useWarehouses;
