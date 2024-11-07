import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

const useBulletinBoard = () => {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBulletinBoard = async (text, item_category, color, city) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.post(
        `${API_URL}/api/items/create/`,
        { text, item_category, color, city },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setLoading(false);
      window.location.reload();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data : "Error occurred");
    }
  };

  const getBulletinBoards = async (searchText = "") => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/api/items/list/`, {
        params: {
          text: searchText,
        },
      });
      setBulletins(response.data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data : "Error occurred");
    }
  };

  const updateBulletinBoard = async (id, text, item_category, color, city) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");

      const response = await axios.patch(
        `${API_URL}/api/items/update/${id}/`,
        { text, item_category, color, city },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setLoading(false);
      window.location.reload();
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data : "Error occurred");
    }
  };

  const deleteBulletinBoard = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = getCookie("accessToken");
      await axios.delete(`${API_URL}/api/items/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLoading(false);
      getBulletinBoards();
      window.location.reload();
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data : "Error occurred");
    }
  };

  useEffect(() => {
    getBulletinBoards();
  }, []);

  return {
    createBulletinBoard,
    getBulletinBoards,
    updateBulletinBoard,
    deleteBulletinBoard,
    bulletins,
    loading,
    error,
  };
};

export default useBulletinBoard;
