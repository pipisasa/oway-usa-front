import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "@/styles/partials/News.module.scss";
import { getCookie } from "@/utils/cookieHelpers";

export default function News() {
  const [data, setData] = useState({
    update_date: "",
    cargo: "",
    arrived: "",
    next_package: "",
    parcel_collection: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setIsAdmin(getCookie("isAdmin") === "true");
    setAccessToken(getCookie("accessToken"));
  }, []);

  useEffect(() => {
    axios
      .get(`https://api-owayusa.com/api/cargos/get/2/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }, []);

  const handleEdit = () => {
    if (isAdmin) {
      setEditMode(true);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    axios
      .patch(`https://api-owayusa.com/api/cargos/update/2/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Ошибка при сохранении данных:", error);
      });
  };

  const formatInputDate = (value) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length > 4) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(
        4,
        8
      )}`;
    } else if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    let formattedValue = value;
    if (
      id === "update_date" ||
      id === "next_package" ||
      id === "parcel_collection"
    ) {
      formattedValue = formatInputDate(value);
    }
    setData((prevData) => ({
      ...prevData,
      [id]: formattedValue,
    }));
  };

  return (
    <section className={`${s.news_contrainer} container`}>
      <div className={s.cards}>
        <div className={s.news_card}>
          <img src="/assets/icons/check.svg" alt="icons" />
          <p>Обновлено в этот день</p>
          <div className={s.input_block}>
            <input
              id="update_date"
              type="text"
              value={data.update_date}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>
        <div className={s.line}></div>
        <div className={s.news_card}>
          <img src="/assets/icons/locations.svg" alt="icons" />
          <div className={s.cargo}>
            <div>
              Груз от
              <div className={s.input_block}>
                <input
                  id="cargo"
                  type="text"
                  value={data.cargo}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div>
              прибыл в
              <div className={s.input_block}>
                <input
                  id="arrived"
                  type="text"
                  value={data.arrived}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.line}></div>
        <div className={s.news_card}>
          <img src="/assets/icons/next-parcels.svg" alt="icons" />
          <p>Следующая посылка</p>
          <div className={s.input_block}>
            <input
              id="next_package"
              type="text"
              value={data.next_package}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>
        <div className={s.line}></div>
        <div className={s.news_card}>
          <img src="/assets/icons/admin-icons/склад.svg" alt="icons" />
          <p>Сбор посылок</p>
          <div className={s.input_block}>
            <input
              id="parcel_collection"
              type="text"
              value={data.parcel_collection}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className={s.buttons}>
          {!editMode ? (
            <button onClick={handleEdit} className={s.edit}>
              Редактировать
            </button>
          ) : (
            <>
              <button onClick={handleCancel} className={s.exit}>
                Отмена
              </button>
              <button onClick={handleSave} className={s.save}>
                Сохранить
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
