import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import c from "@/styles/pages/admin/AdminWareHousesPage.module.scss";
import { Pagination } from "@nextui-org/react";
import Modal from "../../components/shared/Modal";
import { RxCross2 } from "react-icons/rx";
import useUsersAdmin from "@/hooks/admin/useUsers";
import Loading from "@/components/shared/admin/Loading";

const PAGE_SIZE = 7;

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [searchUniqueId, setSearchUniqueId] = useState("");
  const { users, isLoading, fetchUsers } = useUsersAdmin(currentPage);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    setIsLoadingPage(true);
    fetchUsers(currentPage).then(() => setIsLoadingPage(false));
  }, [currentPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        style={{ display: "flex", gap: "20px" }}
        className={c.warehouses_page}
      >
        <div className={c.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input
            type="text"
            placeholder="Поиск по номеру телефона"
            value={searchPhoneNumber}
            onChange={(e) => setSearchPhoneNumber(e.target.value)}
          />
        </div>
        <div className={c.search}>
          <img src="/assets/icons/search.svg" alt="icon" />
          <input
            type="text"
            placeholder="Поиск по уникальному ID"
            value={searchUniqueId}
            onChange={(e) => setSearchUniqueId(e.target.value)}
          />
        </div>
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
                  <td>{user.phone_number}</td>
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
          <div className={s.modal}>
            <Modal isOpen={selectedUser} onClose={() => setSelectedUser(null)}>
              <div className={s.modalContent}>
                <div className={s.btn_center}>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className={s.close_btn}
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>
                <h3>Данные ID паспорта</h3>
                <div>
                  {selectedUser.front_image && selectedUser.back_image ? (
                    <>
                      <img
                        src={`https:/api-owayusa.com/${selectedUser.front_image}`}
                        alt=""
                      />
                      <img
                        src={`https:/api-owayusa.com/${selectedUser.back_image}`}
                        alt=""
                      />
                    </>
                  ) : (
                    <p>Пользователь не загрузил паспортные данные</p>
                  )}
                </div>
              </div>
            </Modal>
          </div>
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
