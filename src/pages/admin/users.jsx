import React, { useEffect, useState } from "react";
import s from "@/styles/pages/admin/AdminUsersPage.module.scss";
import { Pagination } from "@nextui-org/react";
import Modal from "../../components/shared/Modal";
import { RxCross2 } from "react-icons/rx";
import useUsersAdmin from "@/hooks/admin/useUsers";
import Loading from "@/components/shared/admin/Loading";

const PAGE_SIZE = 7;

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className={s.users_page}>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Почта</th>
            <th>Номер телефона</th>
            <th>Данные ID паспорта</th>
          </tr>
        </thead>
        <tbody>
          {users?.results
            ?.filter((item) => item.id !== 1)
            .map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
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
                      src={`http://18.222.184.72:8000/${selectedUser.front_image}`}
                      alt=""
                    />
                    <img
                      src={`http://18.222.184.72:8000/${selectedUser.back_image}`}
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
  );
}
