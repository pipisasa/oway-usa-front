import React, { useState } from "react";
import s from "@/styles/shared/main/TrackNumber.module.scss";
import c from "@/styles/pages/user/TrackingPage.module.scss";

import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookieHelpers";
import axios from "axios";
import Loading from "@/components/shared/admin/Loading";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function TrackNumber() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await axios.get(
        `https://api-owayusa.com/api/warehouses/product/get/${trackingNumber}/`
      );
      setStatus(response.data);
      onOpen();
    } catch (err) {
      console.error("Ошибка при запросе к Ship24 API:", err);
      setError(
        "Произошла ошибка при отслеживании. Пожалуйста, проверьте трек-номер и попробуйте снова."
      );
      setStatus("not-found"); // Устанавливаем статус, чтобы показать, что товар не найден
      onOpen();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${s.track} container`}
      data-aos="zoom-out-right"
      data-aos-duration="600"
    >
      <form onSubmit={handleTrack} className={s.track_info}>
        <div>
          <span>Отслеживание доставки</span>
          <h1>Отслеживайте свою доставку по введенному трек-номеру</h1>
        </div>
        <div className={s.track_info_input}>
          <span>Трек-номер</span>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Введите трек номе"
            required
          />
        </div>
        <button type="sumbit" className={s.button}>
          {loading ? "Загрузка..." : "Проверить"}
          <img src="/assets/icons/rightIcon.svg" alt="logo" />
        </button>
      </form>
      <div className={s.track_img} data-aos="zoom-in-down">
        <img src="assets/images/dron.png" alt="" />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {loading ? (
              <p>Загрузка данных...</p>
            ) : (
              <p>
                {status ? (
                  status.status.name ? (
                    <div className={c.status}>
                      <img src="/assets/icons/впути.svg" alt="" />
                      <p>{status.status.name}</p>
                    </div>
                  ) : (
                    <div className={c.status}>
                      <img src="/assets/icons/icon_notifications.svg" alt="" />
                      <p>Трек-код товара не найден</p>
                    </div>
                  )
                ) : (
                  <p>Загрузка данных...</p>
                )}
              </p>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
