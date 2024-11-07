import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getCookie("accessToken");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/contacts/list/`);
        setContacts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/contacts/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts((prevContacts) =>
        Array.isArray(prevContacts)
          ? prevContacts.filter((contact) => contact.id !== id)
          : []
      );
    } catch (err) {
      setError(err);
    }
  };

  const updateContact = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/contacts/update/${id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      setContacts((prevContacts) =>
        Array.isArray(prevContacts)
          ? prevContacts.map((contact) =>
              contact.id === id ? response.data : contact
            )
          : []
      );
    } catch (err) {
      setError(err);
    }
  };

  return { contacts, loading, error, deleteContact, updateContact };
};

export default useContacts;
