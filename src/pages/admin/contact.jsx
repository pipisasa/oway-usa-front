import React, { useEffect, useRef, useState } from "react";
import s from "@/styles/pages/user/UserWarehouses.module.scss";
import { getCookie } from "@/utils/cookieHelpers";
import useContacts from "@/hooks/useContacts";

export default function ContactsAdmin() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { contacts, loading, error, deleteContact, updateContact } =
    useContacts();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    setIsAuthorized(getCookie("accessToken") !== null);
  }, []);

  const sliderRef = useRef(null);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Информация скопирована!");
      })
      .catch((err) => {
        console.error("Ошибка при копировании: ", err);
      });
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -427, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 427, behavior: "smooth" });
  };

  const openModal = (contact) => {
    setCurrentContact(contact);
    setUpdatedData(contact); // Set the current contact as the initial updated data
    setUpdatedImage(null); // Reset the updated image
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentContact(null);
    setUpdatedData({});
    setUpdatedImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setUpdatedImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (updatedImage) {
      const formData = new FormData();
      formData.append("image", updatedImage);
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }
      await updateContact(currentContact.id, formData);
    } else {
      await updateContact(currentContact.id, updatedData);
    }
    closeModal();
  };

  if (isAuthorized === null) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className={`${s.address_container} `}>
      <div className={s.container_header}>
        <div className={s.slider_btns}>
          <button onClick={scrollLeft}>
            <img src="/assets/icons/arrowLeft.svg" alt="to left" />
          </button>
          <button onClick={scrollRight}>
            <img src="/assets/icons/arrowRight.svg" alt="to right" />
          </button>
        </div>
      </div>
      <div ref={sliderRef} className={s.address_cards}>
        {contacts.results?.map((data, index) => (
          <div key={index} className={s.address_card}>
            <div className={s.card_header}>
              <div>
                <img
                  src={`https://api-owayusa.com/${data.image}`}
                  alt={data.title}
                />
                <h3>Пункты приема в {data.name}:</h3>
              </div>
              <button
                onClick={() => deleteContact(data.id)}
                className={s.delete_button}
              >
                <img src="/assets/icons/delete.svg" alt="delete" />
              </button>
              <button
                onClick={() => openModal(data)}
                className={s.update_button}
              >
                <img src="/assets/icons/Edit123.svg" alt="update" />
              </button>
            </div>

            <div className={s.card_content}>
              <div className={s.content}>
                <div>
                  <img src="/assets/icons/contact_address.svg" alt="icons" />
                  <span>Address</span>
                  <h5>{data.address}</h5>
                </div>
                <div>
                  <img
                    src="/assets/icons/united-states-of-america.svg"
                    alt="icons"
                  />
                  <span>State</span>
                  <h5>{data.state}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_call.svg" alt="icons" />
                  <span>Number</span>
                  <h5>{data.number}</h5>
                </div>
                <div className={s.unit}>
                  <img src="/assets/icons/unit.svg" alt="icons" />
                  <span>Unit</span>
                  <h5>{data.unit}</h5>
                </div>
              </div>
              <div className={s.content}>
                <div>
                  <img src="/assets/icons/city.svg" alt="icons" />
                  <span>City</span>
                  <h5>{data.city}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_zip-code.svg" alt="icons" />
                  <span>Zip code</span>
                  <h5>{data.zip_code}</h5>
                </div>
                <div>
                  <img src="/assets/icons/contact_email.svg" alt="icons" />
                  <span>Email</span>
                  <h5>{data.email}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <div className={s.modal_overlay}>
          <div className={s.modal}>
            <h2>Update Contact</h2>
            {currentContact && (
              <form>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={updatedData.address || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  State:
                  <input
                    type="text"
                    name="state"
                    value={updatedData.state || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Number:
                  <input
                    type="text"
                    name="number"
                    value={updatedData.number || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Unit:
                  <input
                    type="text"
                    name="unit"
                    value={updatedData.unit || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={updatedData.city || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Zip code:
                  <input
                    type="text"
                    name="zip_code"
                    value={updatedData.zip_code || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={updatedData.email || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Image:
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </label>
                <button type="button" onClick={handleUpdate}>
                  Update
                </button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
