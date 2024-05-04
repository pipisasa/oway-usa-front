import React, { useState } from "react";
import s from "@/styles/pages/user/TrackingPage.module.scss";
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

export default function TrackingPage() {
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
        `https://api-owayusa.com/api/warehouses/get/${trackingNumber}/`
      );
      setStatus(response.data);
      console.log(response.data);
      onOpen();
    } catch (err) {
      console.error("Ошибка при запросе к Ship24 API:", err);
      setError(
        "Произошла ошибка при отслеживании. Пожалуйста, проверьте трек-номер и попробуйте снова."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className={s.heroSection_img}>
        <img src="/assets/images/22.png" width={757} height={757} alt="" />
      </div>

      <form className={s.tracking_form} onSubmit={handleTrack}>
        <h3>Введите трек номер для отслеживания доставки</h3>
        <div>
          <label htmlFor="trackingNumber">Трек-номер</label>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Введите трек-номер"
            required
          />
          <button type="submit">Проверить</button>
        </div>
      </form>

      {loading && <Loading />}
      {error && <p>{error}</p>}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {loading ? (
              <p>Загрузка данных...</p>
            ) : (
              <p>
                {status ? (
                  status === "delivery" ? (
                    <div className={s.status}>
                      <img src="/assets/icons/icon_notifications.svg" alt="" />
                      <p>Товар доставлен</p>
                    </div>
                  ) : (
                    <div className={s.status}>
                      <img src="/assets/icons/впути.svg" alt="" />
                      <p>{status.status.name}</p>
                    </div>
                  )
                ) : (
                  <p>Загрузка данных...</p>
                )}
              </p>
            )}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
