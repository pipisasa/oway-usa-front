import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { Pagination } from "@nextui-org/react";
import useUsersAdmin from "@/hooks/admin/useUsers";
import Loading from "@/components/shared/admin/Loading";
import UserDetailModal from "@/components/shared/users/modals/UserDetailModal";
import UserAdminSearch from "@/components/partials/userSelect/UserAdminSearch";

const PAGE_SIZE = 7;

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, isLoading, fetchUsers, updateUsers, deleteUsers, setFilters } =
    useUsersAdmin(currentPage);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [showMultipleDeleteConfirm, setShowMultipleDeleteConfirm] =
    useState(false);
  const [filters, setFiltersState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    unique_id: "",
  });

  useEffect(() => {
    fetchUsers({ currentPage, ...filters });
  }, [currentPage, filters]);

  if (isLoading) {
    return <Loading />;
  }

  const deselectUser = () => setSelectedUser(null);

  const handleEditUser = (userData) => {
    updateUsers(userData.id)
      .then(() => {
        fetchUsers(currentPage);
        deselectUser();
      })
      .catch((error) => {
        console.error("Error editing user:", error);
      });
  };

  const handleFilterChange = (key, value) => {
    setFiltersState((prevFilters) => ({ ...prevFilters, [key]: value }));
    setFilters({ [key]: value });
  };
  const handleUserSelection = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.results.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelectedUsers = () => {
    setShowMultipleDeleteConfirm(true);
  };

  const confirmDeleteSelectedUsers = () => {
    deleteUsers({ ids: selectedUserIds })
      .then(() => {
        fetchUsers(currentPage);
        setSelectedUserIds([]);
        setSelectAll(false);
        setShowMultipleDeleteConfirm(false);
      })
      .catch((error) => {
        console.error("Error deleting users:", error);
      });
  };

  return (
    <section>
      <div className={s.filter}>
        <UserAdminSearch onFilterChange={handleFilterChange} />
      </div>
      <div className={s.users_page}>
        <table>
          <thead>
            <tr>
              <th className={s.gap}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectAll}
                />
                Имя
              </th>
              <th>Фамилия</th>
              <th>Почта</th>
              <th>Номер телефона</th>
              <th>Уникальный ID</th>
              <th>Дата регистрации</th>
              <th className={s.gap} style={{ display: "flex", gap: "10px" }}>
                Действия{" "}
                <button
                  className={s.all_delete}
                  onClick={handleDeleteSelectedUsers}
                >
                  <img src="/assets/icons/admin-icons/Delete.svg" alt="" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.results.map((user) => (
              <tr key={user.id}>
                <td className={s.gap}>
                  {" "}
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => handleUserSelection(user.id)}
                  />
                  {user.first_name}
                </td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number || "Номер телефона не указан"}</td>
                <td>#{user.unique_id}</td>
                <td>{user.created_at}</td>
                <td className={s.gap}>
                  <button
                    className={s.btn}
                    onClick={() => setSelectedUser(user)}
                  >
                    Подробнее
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <UserDetailModal
            userData={selectedUser}
            close={deselectUser}
            editUser={handleEditUser}
          />
        )}
        <div className={s.pagination}>
          <Pagination
            variant="bordered"
            total={Math.ceil(users.count / PAGE_SIZE)}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      {showMultipleDeleteConfirm && (
        <div className={s.modal}>
          <div className={s.confirm_delete_modal}>
            <p>Вы уверены, что хотите удалить выбранных пользователей?</p>
            <button onClick={confirmDeleteSelectedUsers}>Да</button>
            <button onClick={() => setShowMultipleDeleteConfirm(false)}>
              Нет
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
