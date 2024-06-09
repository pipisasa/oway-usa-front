import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";

const API_URL = "https://api-owayusa.com/api/otside_of_illinois";

export const useIllinois = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/list/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setData(response.data.results || []);
        setError(null);
      } catch (err) {
        setError("Ошибка при получении данных");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [accessToken]);

  const updateData = async (updatedData) => {
    try {
      await axios.put(
        `${API_URL}/update_delete/${currentItem.id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при обновлении данных:", err);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_URL}/update_delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDeleteModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при удалении данных:", err);
    }
  };

  return {
    data,
    loading,
    error,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    currentItem,
    setCurrentItem,
    updateData,
    deleteData,
  };
};
