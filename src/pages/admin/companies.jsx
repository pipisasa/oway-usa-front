import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminCompaniesLogo.module.scss";
import useLogo from "@/hooks/admin/useLogo";
import Loading from "@/components/shared/admin/Loading";
import CompaniesEditModal from "@/components/shared/admin/modals/CompaniesEditModal";

export default function CompaniesAdminPage() {
  const { logos, fetchLogos, deleteLogo, isLoading } = useLogo();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleDeleteLogo = async (id) => {
    if (confirm("Вы уверены, что хотите удалить этот логотип?")) {
      await deleteLogo(id);
    }
  };

  const openEditModal = (logo) => {
    setEditingLogo(logo);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditingLogo(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={s.logo_container}>
      {logos.map((logo) => (
        <div key={logo.id} className={s.logo_card}>
          <img src={logo.logo} alt="Логотип" className={s.logo_image} />
          <div className={s.btns}>
            <button onClick={() => handleDeleteLogo(logo.id)}>
              <img src="/assets/icons/delete.svg" alt="delete" />
            </button>
            <button onClick={() => openEditModal(logo)}>
              <img src="/assets/icons/edit.svg" alt="edit" />
            </button>
          </div>
        </div>
      ))}

      {isEditOpen && (
        <CompaniesEditModal
          isOpen={isEditOpen}
          onClose={closeEditModal}
          editingLogo={editingLogo}
        />
      )}
    </section>
  );
}
