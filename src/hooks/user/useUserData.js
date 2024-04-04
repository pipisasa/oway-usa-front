import { getCookie } from "@/utils/cookieHelpers";
import { useEffect, useState } from "react";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        setError("No access token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://18.222.184.72:8000/api/users/profile/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateUserData = async (data, isFormData = false) => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setError("No access token found");
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
      data = JSON.stringify(data);
    }

    try {
      const response = await fetch(
        "http://18.222.184.72:8000/api/users/profile/",
        {
          method: "PATCH",
          headers,
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedData = await response.json();
      setUserData(updatedData);
    } catch (error) {
      setError(error.message);
    }
  };

  return { userData, loading, error, updateUserData };
};

export default useUserData;
