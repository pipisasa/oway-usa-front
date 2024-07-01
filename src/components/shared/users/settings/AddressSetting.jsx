import React from "react";
import s from "@/styles/users/Address.module.scss";
import Modal from "./Modal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useAddresses } from "@/hooks/useAddresses";
import { useModal } from "@/hooks/useModal";

export default function AddressSetting() {
  const {
    addressList,
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
  } = useAddresses();
  const { isModalOpen: isCreateModalOpen, toggleModal: toggleCreateModal } =
    useModal();
  const { isModalOpen: isEditModalOpen, toggleModal: toggleEditModal } =
    useModal();
  const { isModalOpen: isDeleteModalOpen, toggleModal: toggleDeleteModal } =
    useModal();

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
      {addressList.results?.map((address, index) => (
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
