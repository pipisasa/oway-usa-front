import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookieHelpers";

export const useAddresses = () => {
  const [addressList, setAddressList] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchAddresses = async () => {
    const token = getCookie("accessToken");

    try {
      const response = await fetch(
        "https://api-owayusa.com/api/address/list/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAddressList(data);
      } else {
        console.error("Error fetching address list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAddressById = async (id) => {
    const token = getCookie("accessToken");

    try {
      const response = await fetch(
        `https://api-owayusa.com/api/address/get/${id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedAddress(data);
        window.location.reload();
      } else {
        console.error("Error fetching address by ID");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCreate = async (e, toggleCreateModal) => {
    e.preventDefault();
    const token = getCookie("accessToken");

    try {
      const response = await fetch(
        "https://api-owayusa.com/api/address/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toggleCreateModal();
        fetchAddresses();
        window.location.reload();
      } else {
        console.error("Error creating address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitEdit = async (e, toggleEditModal) => {
    e.preventDefault();
    const token = getCookie("accessToken");

    try {
      const response = await fetch(
        `https://api-owayusa.com/api/address/update/${editId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toggleEditModal();
        fetchAddresses();
        window.location.reload();
      } else {
        console.error("Error updating address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id, toggleDeleteModal) => {
    const token = getCookie("accessToken");

    try {
      const response = await fetch(
        `https://api-owayusa.com/api/address/delete/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toggleDeleteModal();
        fetchAddresses();
        window.location.reload();
      } else {
        console.error("Error deleting address");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addressList,
    selectedAddress,
    formData,
    setFormData,
    editId,
    setEditId,
    deleteId,
    setDeleteId,
    handleChange,
    handleSubmitCreate,
    handleSubmitEdit,
    handleDelete,
    fetchAddresses,
    setSelectedAddress,
    fetchAddressById,
  };
};
