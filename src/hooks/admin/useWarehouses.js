import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const warehouseSity = [
  { id: 7, name: "Турция" },
  { id: 8, name: "Москва" },
  { id: 9, name: "Кыргызстан" },
  { id: 14, name: "Чикаго" },
];

const useWarehouses = (currentPage, initialFilters = {}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const router = useRouter();

  const fetchWarehouses = async (newFilters = {}) => {
    const accessToken = getCookie("accessToken");

    const pathParts = router.asPath.split("/");
    const countryName = decodeURIComponent(pathParts[pathParts.length - 1]);
    console.log("Country Name from Path:", countryName);

    setIsLoading(true);
    setError(null);

    const warehouseCity = warehouseSity.find(
      (city) => city.name === countryName
    );
    const warehouseCityId = warehouseCity ? warehouseCity.id : null;

    const mergedFilters = {
      ...filters,
      ...newFilters,
      warehouse: warehouseCityId,
    };

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
  }, [currentPage, filters, router.asPath]);

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
    country_of_origin,
    country_of_destination
    // warehouse
  ) => {
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("name", name);
    // formData.append("warehouse", warehouse.toString());
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
    formData.append("country_of_origin", country_of_origin.toString());
    formData.append(
      "country_of_destination",
      country_of_destination.toString()
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
      return response.data;
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMultipleWarehouses = async (ids) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URL}/api/warehouses/product/delete/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { ids: Array.isArray(ids) ? ids : [ids] },
      });

      await fetchWarehouses();
      setIsSuccess(true);
    } catch (err) {
      if (err.response && err.response.status === 401) {
      } else {
        setError(err.message);
        setIsSuccess(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteMultipleWarehouses,
    warehouses,
    addWarehouses,
    fetchWarehouses,
    setFilters,
    error,
    isLoading,
    count,
  };
};

export default useWarehouses;
