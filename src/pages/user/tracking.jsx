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
        `https://api.ship24.com/public/v1/trackers/search/${trackingNumber}/results`,
        {
          headers: {
            Authorization: `Bearer apik_9JrnxnPPxnuGRuhEoJXz86zSFpMkU9`,
          },
        }
      );
      setStatus(response.data.data.trackings[0].shipment.statusCategory);
      onOpen();
    } catch (err) {
      console.error("Ошибка при запросе к Ship24 API:", err);
      setError(
        "Произошла ошибка при отслеживании. Пожалуйста, проверьте трак-номер и попробуйте снова."
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
        <h3>Введите трак номер для отслеживания доставки</h3>
        <div>
          <label htmlFor="trackingNumber">Трак-номер</label>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Введите трак-номер"
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
            {status ? (
              <p>
                {status === "delivery" ? (
                  <div className={s.status}>
                    <img src="/assets/icons/icon_notifications.svg" alt="" />
                    <p>Товар доставлен</p>
                  </div>
                ) : (
                  <div className={s.status}>
                    <img src="/assets/icons/впути.svg" alt="" />
                    <p>Товар в пути</p>
                  </div>
                )}
              </p>
            ) : (
              <p>Загрузка данных...</p>
            )}
          </ModalBody>
          <ModalFooter>
            {/* <Button auto flat color="error" onPress={onClose}>
              Закрыть
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
