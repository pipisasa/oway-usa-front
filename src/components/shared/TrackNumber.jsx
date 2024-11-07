import { useState } from "react";
import s from "@/styles/shared/main/TrackNumber.module.scss";
import c from "@/styles/pages/user/TrackingPage.module.scss";

import { baseAxios } from "../../utils/baseAxios";
import { useQuery } from "@tanstack/react-query";

export default function TrackNumber() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await baseAxios.get(
        `/warehouses/product/get/${trackingNumber}/`
      );
      return data;
    },
    queryKey: ["warehouses-product-get", { trackingNumber }],
  });

  return (
    <div
      className={`${s.track} container`}
      data-aos="zoom-out-right"
      data-aos-duration="600"
    >
      <div className={s.track_info}>
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
          {isLoading ? "Загрузка..." : "Проверить"}
          <img src="/assets/icons/rightIcon.svg" alt="logo" />
        </button>
      </div>
      <div className={s.track_img} data-aos="zoom-in-down">
        <img src="assets/images/dron.png" alt="" />
      </div>

      {isLoading && <p>Загрузка данных...</p>}
      {data && (
        <div className={c.status}>
          <img src="/assets/icons/впути.svg" alt="" />
          <p>{data.status.name}</p>
        </div>
      )}

      {!isLoading && !data && (
        <div className={c.status}>
          <img src="/assets/icons/icon_notifications.svg" alt="" />
          <p>Трек-код товара не найден</p>
        </div>
      )}
    </div>
  );
}
