import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/add_user_for_admin/`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const useUsersAdmin = (currentPage, initialFilters) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [users, setUsers] = useState({ results: [], count: 0 });
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState(initialFilters);

  const fetchUsers = async (newFilters = {}) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);
    const mergedFilters = {
      ...filters,
      ...newFilters,
    };
    const queryString = Object.entries(mergedFilters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    try {
      const response = await axiosInstance.get(
        `list/?pagination_type=page_number&page=${
          currentPage === undefined ? 1 : currentPage
        }&page_size=7&${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(response.data);
      setTotalCount(response.data.count);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const addUsers = async (
    first_name,
    last_name,
    email,
    phone_number,
    password,
    password2,
    front_image,
    back_image
  ) => {
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("front_image", front_image);
    formData.append("back_image", back_image);

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await axiosInstance.post("add/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchUsers();
      setIsSuccess(true);
      window.location.reload();
    } catch (error) {
      setError(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUsers = async (ids) => {
    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    setError(null);

    try {
      await axios.put(`${API_URL}/api/users/delete/`, ids, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchUsers();
      setIsSuccess(true);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else {
        setError(err.message);
        setIsSuccess(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsers = async (userId, formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const accessToken = getCookie("accessToken");
      await axiosInstance.patch(`update/${userId}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    totalCount,
    addUsers,
    deleteUsers,
    updateUsers,
    error,
    setFilters,
    isLoading,
    fetchUsers,
  };
};

export default useUsersAdmin;
