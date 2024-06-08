import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";

import { Pagination } from "@nextui-org/react";
import useUsersAdmin from "@/hooks/admin/useUsers";
import Loading from "@/components/shared/admin/Loading";
import UserDetailModal from "@/components/shared/users/modals/UserDetailModal";

const PAGE_SIZE = 7;

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [searchUniqueId, setSearchUniqueId] = useState("");
  const { users, isLoading, fetchUsers, updateUsers } =
    useUsersAdmin(currentPage);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    setIsLoadingPage(true);
    fetchUsers(currentPage).then(() => setIsLoadingPage(false));
  }, [currentPage]);

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

  return (
    <>
      <div className={s.users_page}>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Почта</th>
              <th>Номер телефона</th>
              <th>Уникальный ID</th>
              <th>Данные ID паспорта</th>
            </tr>
          </thead>
          <tbody>
            {users?.results
              ?.filter((item) => item.id !== 1)
              .filter(
                (user) =>
                  user.phone_number.includes(searchPhoneNumber) &&
                  user.unique_id.includes(searchUniqueId)
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number || "Номер телефона не указан"}</td>
                  <td>#{user.unique_id}</td>
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
    </>
  );
}
