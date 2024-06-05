import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import Modal from "@/components/shared/Modal";
import useWarehouses from "../../../../hooks/admin/useWarehouses";
import useCountries from "@/hooks/admin/useCountries";
import CustomSelect from "@/components/partials/Select";
import useWarehousesFull from "@/hooks/admin/useWarehousesFull";
import SearchSelect from "@/components/partials/SearchSelect";
import ImagePreviewModal from "../../ImagePreviewModal";

export default function WarehouseProductsModal() {
  const { addWarehouses } = useWarehouses();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    weight: "",
    track_number: "",
    price: "",
    country: "",
    status: "",
    image: "",
    comments: "",
    unique_id_user: "",
    url: "",
    date_sent: "",
    date_arrived: "",
    articul: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);
  const { countries } = useCountries();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const countries1 = [
    { id: 4, name: "Получен на складе отправителя" },
    { id: 5, name: "Отправлен" },
    { id: 6, name: "Получен на складе получателя" },
    { id: 3, name: "Готов к выдаче" },
    { id: 7, name: "Отправлено курьерской службой" },
    { id: 8, name: "Доставлено" },
  ];
  const [selectedOption1, setSelectedOption1] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "url") {
      if (value && !value.startsWith("https://")) {
        return;
      }
    }
    if (name === "date_sent" || name === "date_arrived") {
      let newValue = value
        .replace(/[^\d.]/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2}\.\d{2})(\d)/, "$1.$2");

      if (newValue.length > 10) {
        newValue = newValue.substring(0, 10);
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async () => {
    await addWarehouses(
      formData.name,
      formData.address,
      formData.weight,
      formData.track_number,
      formData.price,
      selectedOption?.id,
      selectedOption1?.id,
      formData.image,
      formData.comments,
      formData.unique_id_user,
      formData.url,
      formData.date_sent,
      formData.date_arrived,
      formData.articul
    );
    setFormData({
      name: "",
      address: "",
      weight: "",
      track_number: "",
      price: "",
      country: "",
      status: "",
      image: "",
      comments: "",
      unique_id_user: "",
      url: "",
      date_sent: "",
      date_arrived: "",
      articul: "",
    });
    setCurrentStep(1);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            nextStep={nextStep}
            previousStep={previousStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
            countries={countries}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            previousStep={previousStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            countries={countries1}
            selectedOption={selectedOption1}
            setSelectedOption={setSelectedOption1}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleChange={handleChange}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <Step1 />;
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        Добавить посылку
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить посылку</h3>
        {renderStep()}
      </Modal>
    </div>
  );
}

const Step1 = ({
  formData,
  handleChange,
  handleImageChange,
  nextStep,
  currentStep,
  countries,
  selectedOption,
  closeModal,
  setSelectedOption,
  setCurrentStep,
}) => (
  <div className={c.step}>
    <div className={c.steps_progress}>
      <div className={c.line}></div>
      <button
        type="button"
        className={currentStep >= 1 ? `${c.active_step}` : ""}
        onClick={() => setCurrentStep(1)}
      >
        1
      </button>
      <div className={c.line}></div>
      <button
        type="button"
        className={currentStep >= 2 ? `${c.active_step}` : ""}
        onClick={() => setCurrentStep(2)}
      >
        2
      </button>
      <div className={c.line}></div>
      <button
        type="button"
        className={currentStep >= 3 ? `${c.active_step}` : ""}
        onClick={() => setCurrentStep(3)}
      >
        3
      </button>
      <div className={c.line}></div>
    </div>
    <form action="" className={s.step_form}>
      <div className={c.first_block}>
        <div>
          <label htmlFor="name">Название посылки</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Введите название посылки"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Фото посылки</label>
          <label className="custom-file-upload">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
            <img src="/assets/icons/selectimg.svg" alt="select img" />
            <span>Выбрать картинку</span>
          </label>
        </div>
        {formData.image && <div></div>}
        {formData.image && (
          <ImagePreviewModal
            previewImage={URL.createObjectURL(formData.image)}
            onClose={closeModal}
          />
        )}

        <div>
          <label htmlFor="">Адрес заказа</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Введите адрес"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Страна отправки</label>
          <CustomSelect
            options={countries}
            selectedOption={selectedOption}
            onChange={(e) => setSelectedOption(e)}
            span={"Выберите страну"}
          />
        </div>
        <div>
          <label htmlFor="">Дата отправки</label>
          <input
            type="text"
            name="date_sent"
            id="date_sent"
            placeholder="dd.mm.yyyy"
            value={formData.date_sent}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Дата прибытия</label>
          <input
            type="text"
            name="date_arrived"
            id="date_arrived"
            placeholder="dd.mm.yyyy"
            value={formData.date_arrived}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Вес</label>
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="Впишите вес"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Трек-номер</label>
          <input
            type="number"
            name="track_number"
            id="track_number"
            placeholder="Введите ID посылки"
            value={formData.track_number}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">Комментарий</label>
        <input
          type="text"
          name="comments"
          id="comments"
          placeholder="Пришитие комментарий"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>
    </form>
    <button className={c.submit_btn} onClick={nextStep}>
      Продолжить
    </button>
  </div>
);

const Step2 = ({
  formData,
  handleChange,
  nextStep,
  currentStep,
  countries,
  selectedOption,
  setSelectedOption,
  setCurrentStep,
}) => (
  <div className={c.step}>
    <div className={c.steps_progress}>
      <div className={c.line}></div>
      <button
        type="button"
        className={currentStep >= 1 ? `${c.active_step}` : ""}
        onClick={() => setCurrentStep(1)}
      >
        1
      </button>
      <div className={c.line}></div>
      <button
        type="button"
        className={currentStep >= 2 ? `${c.active_step}` : ""}
        onClick={() => setCurrentStep(2)}
      >
        2
      </button>
      <div className={c.line}></div>
      <button
        type="button"
        className={currentStep >= 3 ? `${c.active_step}` : ""}
        onClick={() => setCurrentStep(3)}
      >
        3
      </button>
      <div className={c.line}></div>
    </div>
    <form action="" className={c.first_block}>
      <div>
        <label htmlFor="status">Выберите статус посылки</label>

        <CustomSelect
          options={countries}
          selectedOption={selectedOption}
          onChange={(e) => setSelectedOption(e)}
          span={"Выберите статус"}
        />
      </div>
      <div>
        <label htmlFor="status">Стоимость к оплате</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Введите сумму"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="status">Трек код посылки</label>
        <input
          type="number"
          name="articul"
          id="articul"
          placeholder="Введите трек код посылки"
          value={formData.articul}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="status">Ссылка</label>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="Введите ссылку"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
    </form>
    <button className={c.submit_btn} onClick={nextStep}>
      Продолжить
    </button>
  </div>
);

const Step3 = ({ handleChange, handleSubmit, currentStep, setCurrentStep }) => {
  const { warehouses } = useWarehousesFull();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    let filteredWarehouses = [];
    if (value.trim() !== "") {
      filteredWarehouses = warehouses?.results?.filter((warehouse) =>
        warehouse?.unique_id?.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSuggestions(filteredWarehouses);
  };

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelectWarehouse = (warehouse) => {
    handleChange({
      target: { name: "unique_id_user", value: warehouse.unique_id },
    });
    setInputValue(warehouse.unique_id);
    setSuggestions([]);
  };

  return (
    <div className={c.step}>
      <div className={c.steps_progress}>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 1 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(1)}
        >
          1
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 2 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(2)}
        >
          2
        </button>
        <div className={c.line}></div>
        <button
          type="button"
          className={currentStep >= 3 ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(3)}
        >
          3
        </button>
        <div className={c.line}></div>
      </div>
      <form action="" className={s.step_form}>
        <div>
          <label htmlFor="comments">Выбор клиента</label>
          <input
            type="text"
            name="unique_id_user"
            id="unique_id_user"
            placeholder="Напишите ID"
            value={inputValue}
            onChange={handleInputChange}
          />
          <SearchSelect
            suggestions={suggestions}
            handleSelectWarehouse={handleSelectWarehouse}
          />
        </div>
      </form>
      <button className={c.submit_btn} onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
};
