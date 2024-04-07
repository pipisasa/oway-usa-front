import React, { useState } from "react";
import s from "@/styles/admin/Modal.module.scss";
import c from "@/styles/admin/WarehouseProductsModal.module.scss";
import Modal from "@/components/shared/Modal";
import { Switch } from "@nextui-org/react";
import useWarehouses from "../../../../hooks/admin/useWarehouses";
import useCountries from "@/hooks/admin/useCountries";

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
    });

    const toggleModal = () => setIsOpen(!isOpen);
    const {countries} = useCountries()
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
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
        await addWarehouses(
            formData.name,
            formData.address,
            formData.weight,
            formData.track_number,
            formData.price,
            formData.country,
            formData.status,
            formData.image,
            formData.comments,
            formData.unique_id_user
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
        });
        setCurrentStep(1);
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
                        countries={countries}
                    />
                );
            case 2:
                return (
                    <Step2
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                    />
                );
            case 3:
                return (
                    <Step3
                        formData={formData}
                        handleChange={handleChange}
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
                Добавить товар
            </button>
            <Modal isOpen={isOpen} onClose={toggleModal}>
                <h3>Добавить товар</h3>
                {renderStep()}
            </Modal>
        </div>
    );
}

const Step1 = ({ formData, handleChange, handleImageChange, nextStep, countries }) => (
    <div className={c.step}>
        <div className={c.steps_progress}>
            <img src="/assets/images/step1.svg" alt="step 1" />
        </div>
        <form action="" className={s.step_form}>
            <div className={c.first_block}>
                <div>
                    <label htmlFor="name">Название товара</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Введите название товара"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Фото товара</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>
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
                    <label htmlFor="">Страна получения</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option value="">Выберите страну</option>
                        {countries?.map((country) => (
                         <option key={country.id} value={country.id}>{country.name}</option>
                     ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Вес</label>
                    <input
                        type="text"
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
                        type="text"
                        name="track_number"
                        id="track_number"
                        placeholder="Введите ID товара"
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

const Step2 = ({ formData, handleChange, nextStep }) => (
    <div className={c.step}>
        <div className={c.steps_progress}>
            <img src="/assets/images/step2.svg" alt="step 2" />
        </div>
        <form action="" className={c.first_block}>
            <div>
                <label htmlFor="status">Выберите статус товара</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="">Выберите статус</option>
                    <option value="7">Отправлено курьерской службой</option>
                    <option value="6">Получен на складе получателя</option>
                    <option value="5">Отправлен</option>
                    <option value="4">Получен на складе отправителя</option>
                    <option value="3">Готов к выдаче</option>
                    <option value="8">Доставлено</option>
                </select>
            </div>
            <div>
                <label htmlFor="status">Стоимость к оплате</label>
                <input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Введите сумму"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
        </form>
        <button className={c.submit_btn} onClick={nextStep}>
            Продолжить
        </button>
    </div>
);

const Step3 = ({ formData, handleChange, handleSubmit }) => (
    <div className={c.step}>
        <div className={c.steps_progress}>
            <img src="/assets/images/step3.svg" alt="step 3" />
        </div>
        <form action="" className={s.step_form}>
            <div>
                <label htmlFor="comments">Выбор клиента</label>
                <input
                    type="text"
                    name="unique_id_user"
                    id="unique_id_user"
                    placeholder="Напишите ID"
                    value={formData.unique_id_user}
                    onChange={handleChange}
                />
            </div>
        </form>
        <button className={c.submit_btn} onClick={handleSubmit}>
            Отправить
        </button>
    </div>
);

