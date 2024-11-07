import { useState } from "react";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

const useLogo = () => {
  const [logos, setLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = getCookie("accessToken");

  const fetchLogos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/logos/list/`);
      const data = await response.json();
      if (response.ok) {
        setLogos(data);
      } else {
        throw new Error(
          data.message || "Произошла ошибка при получении логотипов"
        );
      }
    } catch (error) {
      console.error("Error fetching logos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLogo = async (logoLink, file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("link", logoLink);
    formData.append("logo", file);

    try {
      const response = await fetch(`${API_URL}/api/logos/add/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        await fetchLogos();
        window.location.reload();
      } else {
        const data = await response.json();
        throw new Error(
          data.message || "Произошла ошибка при добавлении логотипа"
        );
      }
    } catch (error) {
      console.error("Error adding logo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLogo = async (id, newLink, newFile) => {
    setIsLoading(true);
    const formData = new FormData();
    if (newLink) formData.append("link", newLink);
    if (newFile) formData.append("logo", newFile);

    try {
      const response = await fetch(
        `${API_URL}/api/logos/update_delete/${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        await fetchLogos();
        window.location.reload();
      } else {
        const data = await response.json();
        throw new Error(
          data.message || "Произошла ошибка при обновлении логотипа"
        );
      }
    } catch (error) {
      console.error("Error updating logo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLogo = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/logos/update_delete/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        await fetchLogos();
      } else {
        const data = await response.json();
        throw new Error(
          data.message || "Произошла ошибка при удалении логотипа"
        );
      }
    } catch (error) {
      console.error("Error deleting logo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logos,
    isLoading,
    fetchLogos,
    addLogo,
    updateLogo,
    deleteLogo,
  };
};

export default useLogo;
