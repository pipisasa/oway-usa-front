import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { Pagination, user } from "@nextui-org/react";
import useUsersAdmin from "@/hooks/admin/useUsers";
import Loading from "@/components/shared/admin/Loading";
import UserDetailModal from "@/components/shared/users/modals/UserDetailModal";
import UserAdminSearch from "@/components/partials/userSelect/UserAdminSearch";

const PAGE_SIZE = 7;

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, isLoading, fetchUsers, updateUsers, setFilters } =
    useUsersAdmin(currentPage);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [filters, setFiltersState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    unique_id: "",
  });
  useEffect(() => {
    // setIsLoadingPage(true);
    // fetchUsers(currentPage).then(() => setIsLoadingPage(false));
    fetchUsers({ currentPage, ...filters });
  }, [currentPage, filters]);

  if (isLoading) {
    return <Loading />;
  }

  const deselectUser = () => setSelectedUser(null);

  const handleEditUser = (userData) => {
    updateUsers(userData.id)
      .then(() => {
        updateUsers(currentPage);
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
  return (
    <section>
      <div className={s.filter}>
        <UserAdminSearch onFilterChange={handleFilterChange} />
      </div>
      <div className={s.users_page}>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Почта</th>
              <th>Номер телефона</th>
              <th>Уникальный ID</th>
              <th>Дата регистрации</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.results.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number || "Номер телефона не указан"}</td>
                <td>#{user.unique_id}</td>
                <td>{user.created_at}</td>
                <td>
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
    </section>
  );
}
