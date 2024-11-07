import React, { useState, useEffect } from "react";
import s from "@/styles/pages/user/TrackingPage.module.scss";
import axios from "axios";
import Loading from "@/components/shared/admin/Loading";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useMainWarehouses } from "@/hooks/admin/warehouses/useWarehouses";
import { API_URL } from "@/constants";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { warehouses, fetchWarehouses } = useMainWarehouses();
  const [warehouseName, setWarehouseName] = useState("");

  useEffect(() => {
    fetchWarehouses();
  }, [fetchWarehouses]);

  useEffect(() => {
    if (status && warehouses.length > 0) {
      const warehouse = warehouses.find((wh) => wh.id === status.warehouse);
      setWarehouseName(warehouse ? warehouse.name : "Неизвестный склад");
    }
  }, [status, warehouses]);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await axios.get(
        `${API_URL}/api/warehouses/product/get/${trackingNumber}/`
      );
      setStatus(response.data);
      onOpen();
    } catch (err) {
      console.error("Ошибка при запросе к Ship24 API:", err);
      setError(
        "Произошла ошибка при отслеживании. Пожалуйста, проверьте трек-номер и попробуйте снова."
      );
      setStatus("not-found");
      onOpen();
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
          <button type="submit">{loading ? "Загрузка..." : "Проверить"}</button>
        </div>
      </form>

      {loading && <Loading />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {loading ? (
              <p>Загрузка данных...</p>
            ) : (
              <p>
                {status ? (
                  status.status?.name ? (
                    <div className={s.status}>
                      <img src="/assets/icons/впути.svg" alt="" />
                      <p>{status.status.name}</p>
                      <span>Склад: {warehouseName}</span>
                    </div>
                  ) : (
                    <div className={s.status}>
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
    </section>
  );
}
