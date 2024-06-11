import React, { useState, useEffect } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import Modal from "@/components/shared/Modal";
import useWarehouses from "@/hooks/admin/useWarehouses";
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
  status: "",
  image: "",
  comments: "",
  unique_id_user: clientId,
  date_sent: "",
  date_arrived: "",
  is_parcels: true,
  country_of_origin: "",
  country_of_destination: "",
  lenght: "",
  height: "",
  width: "",
});

export default function WarehouseProductsModalV2({ clientId, warehouseId }) {
  const { addWarehouses } = useWarehouses();
  const { deleteWarehouse } = useUserWarehouses();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData(clientId));
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
      console.log("Selected Option:", selectedOption);
      console.log("Selected Option1:", selectedOption1);
      console.log("Form Data:", formData);

      if (!selectedOption || !selectedOption1) {
        throw new Error("Country or Status is not defined");
      }

      await addWarehouses({
        ...formData,
        status: selectedOption1,
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

  const country_of_origin = [
    { id: 3, name: "сша" },
    { id: 4, name: "Турция" },
  ];
  const country_of_destination = [
    { id: 3, name: "сша" },
    { id: 4, name: "Турция" },
  ];
  const handleSelectChange1 = (e) => {
    const newSelectedId = e.target.value;
    setSelectedOption(newSelectedId);
    handleChange({
      target: { name: "country_of_origin", value: newSelectedId },
    });
  };

  const handleSelectChange2 = (e) => {
    const newSelectedId2 = e.target.value;
    setSelectedOption1(newSelectedId2);
    handleChange({
      target: { name: "country_of_destination", value: newSelectedId2 },
    });
  };

  const status = [
    { id: 8, name: "Доставлено" },
    { id: 7, name: "Отправлено курьерской службой" },
    { id: 6, name: "Получен на складе" },
    { id: 5, name: "Отправлен" },
    { id: 4, name: "Получен в ПВЗ" },
    { id: 3, name: "Готов к выдаче" },
  ];

  const handleSelectChange = (e) => {
    const newSelectedId = e.target.value;
    setSelectedOption(newSelectedId);
    handleChange({
      target: { name: "status", value: newSelectedId },
    });
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
          <div className={c.flex}>
            <div className={c.input}>
              <label htmlFor="country_of_origin">Страна отправки</label>
              <select
                id="country_of_origin"
                name="country_of_origin"
                value={formData.country_of_origin || ""}
                onChange={handleSelectChange1}
                className={c.select}
              >
                <option value="">Выберите страну</option>
                {country_of_origin.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={c.input}>
              <label htmlFor="country_of_destination">Страна прибытия</label>
              <select
                id="country_of_destination"
                name="country_of_destination"
                value={formData?.country_of_destination}
                onChange={handleSelectChange2}
                className={c.select}
              >
                <option value="">Выберите страну</option>
                {country_of_destination.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
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
          <div className={c.flex}>
            <InputField
              label="Высота"
              name="lenght"
              value={formData.lenght}
              onChange={handleChange}
              placeholder="Впишите высоту"
            />
            <InputField
              label="Длина"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Впишите длину"
            />
            <InputField
              label="Ширина"
              name="width"
              value={formData.width}
              onChange={handleChange}
              placeholder="Впишите ширина"
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
        <div className={c.input}>
          <label htmlFor="status">Выберите статус посылки</label>
          <select
            id="status"
            name="status"
            value={selectedOption1}
            onChange={handleSelectChange}
            className={c.select}
          >
            <option value="">Выберите статус</option>
            {status.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
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
