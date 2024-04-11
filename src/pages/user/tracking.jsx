import React, { useState } from "react";
import s from "@/styles/pages/user/TrackingPage.module.scss";
import axios from "axios";
import Loading from "@/components/shared/admin/Loading";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [detailedTrackingInfo, setDetailedTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDetailedTrackingInfo(null);

    try {
      const response = await axios.get(
        `https://api.ship24.com/public/v1/trackers/search/${trackingNumber}/results`,
        {
          headers: {
            Authorization: `Bearer apik_9JrnxnPPxnuGRuhEoJXz86zSFpMkU9`,
          },
        }
      );

      setDetailedTrackingInfo(response.data);
    } catch (err) {
      console.error("Ошибка при запросе к Ship24 API:", err);
      setError(
        "Произошла ошибка при отслеживании. Пожалуйста, проверьте трек-номер и попробуйте снова."
      );
    } finally {
      setLoading(false);
    }
  };

  const lastEvent =
    detailedTrackingInfo?.data?.trackings[0]?.events?.slice(-1)[0];

    
  return (
    <section>
       <div className={s.heroSection_img}>
        <img
          src="/assets/images/22.png"
          width={757}
          height={757}
          alt=""
        />
      </div>
      {!detailedTrackingInfo && (
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
          </div>
          <button type="submit">Проверить</button>
        </form>
      )}

      {loading && <Loading />}
      {error && <p>{error}</p>}
      {detailedTrackingInfo && (
        <section className={s.track_results}>
          <div>
            {detailedTrackingInfo.data.trackings[0].events.map(
              (event, index) => (
                <div key={index} className={s.event}>
                  <div className={s.time}>
                    <h5>{new Date(event.datetime).toLocaleDateString()}</h5>
                    <span>{new Date(event.datetime).toLocaleTimeString()}</span>
                  </div>
                  <div className={s.img}>
                    <img src="/assets/icons/sircle.svg" alt="" />
                    <img src="/assets/icons/line.svg" alt="" />
                  </div>
                  <div className={s.firma}>
                    <p>
                      <span>{event.sourceCode}</span>
                      {event.status}
                    </p>
                    <div className={s.mobile_time}>
                      <h5>{new Date(event.datetime).toLocaleDateString()}</h5>
                      <span>
                        {new Date(event.datetime).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className={s.main_info}>
            <div>
              <label htmlFor="">Номер отслеживания</label>
              <span>{trackingNumber}</span>
            </div>
            <div>
              <label htmlFor="">Страна отправки</label>
              <span>
                {
                  detailedTrackingInfo.data.trackings[0].shipment
                    .originCountryCode
                }
              </span>
            </div>
            <div>
              <label htmlFor="">Страна назначения</label>
              <span>
                {
                  detailedTrackingInfo.data.trackings[0].shipment
                    .destinationCountryCode
                }
              </span>
            </div>
            {/* <div>
              <label htmlFor="">Найдено в</label>
              <span>{lastEvent?.location}</span>
            </div> */}
            <div>
              <label htmlFor="">Проверено в службах</label>
              <span>{lastEvent?.courierCode}</span>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
