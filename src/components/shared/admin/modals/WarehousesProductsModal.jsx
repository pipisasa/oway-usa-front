import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useWarehouses from "../../../../hooks/admin/useWarehouses";
import useCountries from "@/hooks/admin/useCountries";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

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
    date_sent: "",
    date_arrived: "",
    country_of_origin: 0,
    country_of_destination: 0,
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
    { id: 8, name: "Доставлено" },
    { id: 7, name: "Отправлено курьерской службой" },
    { id: 6, name: "Получен на складе" },
    { id: 5, name: "Отправлен" },
    { id: 4, name: "Получен в ПВЗ" },
    { id: 3, name: "Готов к выдаче" },
  ];

  const [selectedOption1, setSelectedOption1] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (
      name === "country_of_origin" ||
      name === "country_of_destination" ||
      name === "weight" ||
      name === "track_number" ||
      name === "price"
    ) {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) parsedValue = "";
    }

    if (name === "date_sent" || name === "date_arrived") {
      parsedValue = value
        .replace(/[^\d.]/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2}\.\d{2})(\d)/, "$1.$2");

      if (parsedValue.length > 10) {
        parsedValue = parsedValue.substring(0, 10);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
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
    console.log("Submitting form data:", formData);
    console.log("Selected option:", selectedOption);
    try {
      await addWarehouses(
        formData.name,
        formData.address,
        formData.weight,
        formData.track_number,
        formData.price,
        selectedOption?.id,
        formData.status,
        formData.image,
        formData.comments,
        formData.unique_id_user,
        formData.date_sent,
        formData.date_arrived,
        // formData.country_of_origin,
        // formData.country_of_destination
        Number(formData.country_of_origin), // Преобразование в число
        Number(formData.country_of_destination)
      );
      console.log("Form data successfully submitted");
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
        date_sent: "",
        date_arrived: "",
        country_of_origin: 0,
        country_of_destination: 0,
      });
      setCurrentStep(1);
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
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
