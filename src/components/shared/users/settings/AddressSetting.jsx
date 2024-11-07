import React, { useEffect, useState } from "react";
import s from "@/styles/users/Address.module.scss";
import Modal from "./Modal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useAddresses } from "@/hooks/useAddresses";
import { useModal } from "@/hooks/useModal";
import { getCookie } from "@/utils/cookieHelpers";
import { API_URL } from "@/constants";

export default function AddressSetting({ UserId }) {
  const {
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
    fetchAddressById,
  } = useAddresses();
  const { isModalOpen: isCreateModalOpen, toggleModal: toggleCreateModal } =
    useModal();
  const { isModalOpen: isEditModalOpen, toggleModal: toggleEditModal } =
    useModal();
  const { isModalOpen: isDeleteModalOpen, toggleModal: toggleDeleteModal } =
    useModal();

  const [userData, setUserData] = useState(null);
  const token = getCookie("accessToken");

  useEffect(() => {
    fetchUserData(UserId);
  }, [UserId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/address/list/?user=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      full_name: address.full_name,
      phone_number: address.phone_number,
      email: address.email,
      address: address.address,
      city: address.city,
      country: address.country,
    });
    setEditId(address.id);
    toggleEditModal();
  };

  const handleConfirmDelete = (id) => {
    setDeleteId(id);
    toggleDeleteModal();
  };

  return (
    <div className={s.address}>
      <div className={s.create}>
        <button style={{ padding: "24px" }} onClick={toggleCreateModal}>
          <img src="/assets/icons/add_board.svg" alt="" />
        </button>
      </div>
      <Modal
        isModalOpen={isCreateModalOpen}
        toggleModal={toggleCreateModal}
        handleSubmit={(e) => handleSubmitCreate(e, toggleCreateModal)}
        handleChange={handleChange}
        formData={formData}
      />
      <EditModal
        isModalOpen={isEditModalOpen}
        toggleModal={toggleEditModal}
        handleSubmit={(e) => handleSubmitEdit(e, toggleEditModal)}
        handleChange={handleChange}
        formData={formData}
      />
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        toggleModal={toggleDeleteModal}
        handleDelete={() => handleDelete(deleteId, toggleDeleteModal)}
        deleteId={deleteId}
      />
      {userData?.results?.map((address, index) => (
        <div key={index} className={s.addressBlock}>
          <div>
            <img src="/assets/icons/user-icons/user.svg" alt="" />
            <p>{address.full_name}</p>
          </div>
          <div>
            <img src="/assets/icons/user-icons/city.svg" alt="" />
            <p>
              {address.country}, {address.city}
            </p>
          </div>
          <div>
            <img src="/assets/icons/user-icons/maps-and-flags.svg" alt="" />
            <p>{address.address}</p>
          </div>

          <div>
            <img src="/assets/icons/user-icons/phone-call.svg" alt="" />
            <p>{address.phone_number}</p>
          </div>
          <div>
            <img src="/assets/icons/user-icons/email.svg" alt="" />
            <p>{address.email}</p>
          </div>
          <div className={s.df}>
            <button
              onClick={() => handleConfirmDelete(address.id)}
              className={s.deleteButton}
            >
              Удалить
            </button>
            <button
              onClick={() => handleEdit(address)}
              className={s.editButton}
            >
              Редактировать
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
