import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import Modal from "@/components/shared/Modal";
import useWarehouses from "@/hooks/admin/useWarehouses";
import useCountries from "@/hooks/admin/useCountries";
import CustomSelect from "@/components/partials/Select";
import useWarehousesFull from "@/hooks/admin/useWarehousesFull";
import SearchSelect from "@/components/partials/SearchSelect";
import useUserWarehouses from "@/hooks/admin/useUserWarehouses";
import ImagePreviewModal from "../../ImagePreviewModal";

const initialFormData = (clientId) => ({
  name: "",
  address: "",
  weight: "",
  track_number: "",
  price: "",
  country: "",
  status: "",
  image: "",
  comments: "",
  unique_id_user: clientId,
  url: "",
  date_sent: "",
  date_arrived: "",
  articul: "",
  is_parcels: true,
});

export default function WarehouseProductsModalV2({
  closeModal,
  clientId,
  warehouseId,
}) {
  const { addWarehouses } = useWarehouses();
  const { deleteWarehouse } = useUserWarehouses();
  const { countries } = useCountries();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData(clientId));
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "url" && value && !value.startsWith("https://")) {
      return;
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
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async () => {
    try {
      await deleteWarehouse(warehouseId);
      await addWarehouses({
        ...formData,
        country: selectedOption?.id,
        status: selectedOption1?.id,
      });
      setFormData(initialFormData(clientId));
      setCurrentStep(1);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(
        "Ошибка при отправке данных формы или при удалении склада:",
        error
      );
    }
  };

  const Step1 = () => (
    <div className={c.step}>
      <StepProgress currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <form className={s.step_form}>
        <div className={c.first_block}>
          <InputField
            label="Название посылки"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите название посылки"
          />
          <ImageUpload
            label="Фото посылки"
            name="image"
            onChange={handleImageChange}
            imagePreview={formData.image && URL.createObjectURL(formData.image)}
          />
          <InputField
            label="Адрес заказа"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Введите адрес"
          />
          <CustomSelect
            span="Страна отправки"
            options={countries}
            selectedOption={selectedOption}
            onChange={setSelectedOption}
            placeholder="Выберите страну"
          />
          <div className={c.flex}>
            <DateInputField
              label="Дата отправки"
              name="date_sent"
              value={formData.date_sent}
              onChange={handleChange}
            />
            <DateInputField
              label="Дата прибытия"
              name="date_arrived"
              value={formData.date_arrived}
              onChange={handleChange}
            />
          </div>
          <div className={c.flex}>
            <InputField
              label="Вес"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Впишите вес"
            />
            <InputField
              label="Трек-номер"
              name="track_number"
              value={formData.track_number}
              onChange={handleChange}
              placeholder="Введите ID посылки"
            />
          </div>
        </div>
        <InputField
          label="Комментарий"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Пришитие комментарий"
        />
      </form>
      <button className={c.submit_btn} onClick={() => setCurrentStep(2)}>
        Продолжить
      </button>
    </div>
  );

  const Step2 = () => (
    <div className={c.step}>
      <StepProgress currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <form className={c.first_block}>
        <CustomSelect
          span="Выберите статус посылки"
          options={countries}
          selectedOption={selectedOption1}
          onChange={setSelectedOption1}
          placeholder="Выберите статус"
        />
        <div className={c.flex}>
          <InputField
            label="Стоимость к оплате"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Введите сумму"
          />
          <InputField
            label="Трек код посылки"
            name="articul"
            value={formData.articul}
            onChange={handleChange}
            placeholder="Введите трек код посылки"
          />
        </div>
        <InputField
          label="Ссылка"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Введите ссылку"
        />
      </form>
      <button className={c.submit_btn} onClick={() => setCurrentStep(3)}>
        Продолжить
      </button>
    </div>
  );

  const Step3 = () => {
    const { warehouses } = useWarehousesFull();
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      if (value.trim() !== "") {
        const filteredWarehouses = warehouses?.results?.filter((warehouse) =>
          warehouse?.unique_id?.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredWarehouses);
      } else {
        setSuggestions([]);
      }
    };

    const handleSelectWarehouse = (warehouse) => {
      setFormData((prevData) => ({
        ...prevData,
        unique_id_user: warehouse.unique_id,
      }));
      setInputValue(warehouse.unique_id);
      setSuggestions([]);
    };

    return (
      <div className={c.step}>
        <StepProgress
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <form className={s.step_form}>
          <InputField
            label="Выбор клиента"
            name="unique_id_user"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Напишите ID"
            disabled
          />
          <SearchSelect
            suggestions={suggestions}
            handleSelectWarehouse={handleSelectWarehouse}
          />
        </form>
        <button className={c.submit_btn} onClick={handleSubmit}>
          Отправить
        </button>
      </div>
    );
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        В склад
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить посылку</h3>
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
      </Modal>
    </div>
  );
}

const StepProgress = ({ currentStep, setCurrentStep }) => (
  <div className={c.steps_progress}>
    <div className={c.line}></div>
    {[1, 2, 3].map((step) => (
      <React.Fragment key={step}>
        <button
          type="button"
          className={currentStep >= step ? `${c.active_step}` : ""}
          onClick={() => setCurrentStep(step)}
        >
          {step}
        </button>
        <div className={c.line}></div>
      </React.Fragment>
    ))}
  </div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => (
  <div className={c.input}>
    <label htmlFor={name}>{label}</label>
    <input
      type={
        name === "price" ||
        name === "articul" ||
        name === "weight" ||
        name === "track_number"
          ? "number"
          : "text"
      }
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

const DateInputField = ({ label, name, value, onChange }) => (
  <div className={c.input}>
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      name={name}
      id={name}
      placeholder="dd.mm.yyyy"
      value={value}
      onChange={onChange}
    />
  </div>
);

const ImageUpload = ({ label, name, onChange, imagePreview }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <label className="custom-file-upload">
      <input type="file" name={name} id={name} onChange={onChange} />
      <img src="/assets/icons/selectimg.svg" alt="select img" />
      <span>Выбрать картинку</span>
    </label>
    {imagePreview && <ImagePreviewModal previewImage={imagePreview} />}
  </div>
);
