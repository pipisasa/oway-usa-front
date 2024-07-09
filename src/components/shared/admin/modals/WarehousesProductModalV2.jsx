import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import Modal from "@/components/shared/Modal";
import useWarehouses from "../../../../hooks/admin/useWarehouses";
import useCountries from "@/hooks/admin/useCountries";
import Step1 from "./stepUserParcels/Step1";
import Step2 from "./stepUserParcels/Step2";
import Step3 from "./stepUserParcels/Step3";
import { useRouter } from "next/router";
import useUserWarehouses from "@/hooks/admin/useUserWarehouses";

export default function WarehouseProductsModalV2({
  clientId,
  warehouseId,
  warehouse,
  address,
  comments,
  tracking_number,
  country_of_origin1,
  country_of_destination1,
}) {
  const { addWarehouses } = useWarehouses();
  const { deleteWarehouse } = useUserWarehouses();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: address,
    weight: "",
    width: "",
    height: "",
    length: "",
    track_number: tracking_number || "",
    price: "",
    warehouse: warehouse || 0,
    country: "",
    status: "",
    image: "",
    comments: comments || "",
    unique_id_user: clientId,
    date_sent: "",
    date_arrived: "",
    country_of_origin: country_of_origin1 || 0,
    country_of_destination: country_of_destination1 || 0,
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
    { id: 6, name: "Получен, готов к отправке" },
    { id: 5, name: "Ваша посылка в пути" },
    { id: 4, name: "Поступил в ПВЗ, готов к выдаче" },
    { id: 3, name: "Отправлено курьерской службой" },
  ];

  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (
      name === "country_of_origin" ||
      name === "country_of_destination" ||
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
    try {
      await deleteWarehouse(warehouseId);
      await addWarehouses(
        formData.name,
        formData.address,
        formData.weight,
        formData.length,
        formData.width,
        formData.height,
        formData.track_number,
        formData.price,
        selectedOption?.id,
        formData.status,
        formData.image,
        formData.comments,
        formData.unique_id_user,
        formData.date_sent,
        formData.date_arrived,
        Number(formData.country_of_origin),
        Number(formData.country_of_destination),
        formData.warehouse
      );
      setFormData({
        name: "",
        address: address,
        weight: "",
        width: "",
        height: "",
        length: "",
        track_number: tracking_number || "",
        price: "",
        warehouse: warehouse,
        country: "",
        status: "",
        image: "",
        comments: comments || "",
        unique_id_user: clientId,
        date_sent: "",
        date_arrived: "",
        country_of_origin: country_of_origin1 || 0,
        country_of_destination: country_of_destination1 || 0,
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
            comments12={comments}
            tracking_number12={tracking_number}
            formData={formData}
            country_of_origin1={country_of_origin1}
            country_of_destination1={country_of_destination1}
            setFormData={setFormData}
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
            warehouse={warehouse}
            handleChange={handleChange}
            nextStep={nextStep}
            previousStep={previousStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            countries={countries1}
            selectedOption={selectedOption1}
            setSelectedOption={setSelectedOption1}
            selectedOption2={selectedOption2}
            setSelectedOption2={setSelectedOption2}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            address={address}
            handleChange={handleChange}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleSubmit={handleSubmit}
            clientId={clientId}
          />
        );
      default:
        return <Step1 />;
    }
  };

  return (
    <div className={s.modal}>
      <button onClick={toggleModal} className={s.add_btn}>
        В склад
      </button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h3>Добавить посылку</h3>
        {renderStep()}
      </Modal>
    </div>
  );
}
