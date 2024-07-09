import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import usePurchase from "@/hooks/usePurchase";
import s from "@/styles/components/shared/modals/MyRequests.module.scss";
import { useModal } from "@/hooks/modals/useModal";
import PurchaseModal from "../../main/PurchaseModal";
import { RxCross1 } from "react-icons/rx";
import ImageModal from "../../admin/modals/ImageModal";

export default function MyRequestsModal() {
  const { handleChange, submitPurchase, isSubmitted, isLoading } =
    usePurchase();
  const {
    isOpen: isMainModalOpen,
    openModal: openMainModal,
    closeModal: closeMainModal,
  } = useModal();
  const {
    isOpen: isPurchaseModalOpen,
    openModal: openPurchaseModal,
    closeModal: closePurchaseModal,
  } = useModal();

  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileChange1 = useCallback((e) => {
    const file = e.target.files[0];
    setSelectedFile1(file);
    setPreviewImage1(URL.createObjectURL(file));
  }, []);

  const handleFileChange2 = useCallback((e) => {
    const file = e.target.files[0];
    setSelectedFile2(file);
    setPreviewImage2(URL.createObjectURL(file));
  }, []);

  const onSubmitHandler = useCallback(
    async (data) => {
      await submitPurchase({
        ...data,
        purchase_image: selectedFile1,
        purchase_image_2: selectedFile2 || null,
      });
      reset();
    },
    [submitPurchase, selectedFile1, selectedFile2, reset]
  );

  useEffect(() => {
    if (isSubmitted) {
      openPurchaseModal();
    }
  }, [isSubmitted, openPurchaseModal]);

  const closeModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageSrc(null);
  };

  const handleDeleteImage = () => {
    if (selectedImageSrc === previewImage1) {
      setSelectedFile1(null);
      setPreviewImage1(null);
    } else if (selectedImageSrc === previewImage2) {
      setSelectedFile2(null);
      setPreviewImage2(null);
    }
    closeModal();
  };

  return (
    <>
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={closePurchaseModal}
      />
      <button onClick={openMainModal} className={s.openModalButton}>
        Добавить заявку
      </button>
      {isMainModalOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <button onClick={closeMainModal} className={s.closeModalButton}>
              <RxCross1 size={22} />
            </button>
            <h2>Добавить заявку</h2>
            <form
              className={`${s.purchase} container`}
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className={s.purchase_container}>
                <div className={s.form_container}>
                  <div className={s.purchase_inner}>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="full_name"
                        name="full_name"
                        label="ФИО"
                        type="text"
                        placeholder="Введите ФИО"
                        errors={errors.full_name}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          required: "Это поле обязательно к заполнению",
                          minLength: { value: 3, message: "Минимум 3 символа" },
                        }}
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="url"
                        name="url"
                        label="Ссылка на товар"
                        type="text"
                        placeholder="https://"
                        errors={errors.url}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          required: "Это поле обязательно к заполнению",
                        }}
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="name_of_purchase"
                        name="name_of_purchase"
                        label="Название товара, как в магазине"
                        type="text"
                        placeholder="Введите название товара"
                        errors={errors.name_of_purchase}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          required: "Это поле обязательно к заполнению",
                        }}
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="count"
                        name="count"
                        label="Количество"
                        type="number"
                        placeholder="Введите количество"
                        errors={errors.count}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          required: "Это поле обязательно к заполнению",
                          min: { value: 1, message: "Минимум 1" },
                        }}
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="email"
                        name="email"
                        label="Электронная почта"
                        type="email"
                        placeholder="Введите электронную почту"
                        errors={errors.email}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          required: "Это поле обязательно к заполнению",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Некорректный email",
                          },
                        }}
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="description"
                        name="description"
                        label="Комментарий к товару"
                        type="text"
                        placeholder="Введите комментарий"
                        errors={errors.description}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          required: "Это поле обязательно к заполнению",
                        }}
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="telegram"
                        name="telegram"
                        label="Telegram"
                        type="text"
                        placeholder="Введите @username"
                        errors={errors.telegram}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          pattern: {
                            value: /^@?(\w){1,15}$/,
                            message: "Некорректный username",
                          },
                        }}
                        icon="/assets/icons/telegram.svg"
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="phone_number"
                        name="phone_number"
                        label="WhatsApp"
                        type="number"
                        placeholder="Введите номер телефона"
                        errors={errors.phone_number}
                        handleChange={handleChange}
                        register={register}
                        validation={{
                          required: "Это поле обязательно к заполнению",
                          pattern: {
                            value: /^\+?[1-9]\d{1,14}$/,
                            message: "Некорректный номер телефона",
                          },
                        }}
                        icon="/assets/icons/whatsapp.svg"
                      />
                    </div>
                    <FileInputField
                      label="Добавьте первый скриншот"
                      handleChange={handleFileChange1}
                      errors={errors.purchase_image}
                      previewImage={previewImage1}
                      setIsImageModalOpen={setIsImageModalOpen}
                      setSelectedImageSrc={setSelectedImageSrc}
                      required
                    />
                    {selectedFile1 && (
                      <FileInputField
                        label="Добавьте второй скриншот"
                        handleChange={handleFileChange2}
                        errors={errors.purchase_image_2}
                        previewImage={previewImage2}
                        setIsImageModalOpen={setIsImageModalOpen}
                        setSelectedImageSrc={setSelectedImageSrc}
                      />
                    )}
                  </div>
                  <p style={{ marginTop: "10px" }}>
                    Формат PNG, JPEG, JPG | Максимальный размер файла 5 МБ |
                    512x512
                  </p>
                  <div>
                    <button type="submit" className={s.button}>
                      <span>{isLoading ? "Загрузка..." : "Отправить"}</span>
                      <img src="/assets/icons/rightIcon.svg" alt="logo" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <ImageModal
        src={selectedImageSrc}
        isOpen={isImageModalOpen}
        onClose={closeModal}
        onDelete={handleDeleteImage}
      />
    </>
  );
}

const InputField = ({
  id,
  name,
  label,
  placeholder,
  errors,
  handleChange,
  register,
  validation,
  icon,
  type,
}) => (
  <div className={errors ? s.error : s.purchase_inner_froms_inputs}>
    <label>
      {label} {validation.required && <span>*</span>}
    </label>
    <div className={icon ? s.icon_input : ""}>
      {icon && <img src={icon} alt={name} />}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        {...register(name, validation)}
      />
    </div>
    {errors && <p>{errors.message}</p>}
  </div>
);

const FileInputField = ({
  label,
  handleChange,
  errors,
  previewImage,
  setIsImageModalOpen,
  setSelectedImageSrc,
  required,
}) => (
  <div className={errors ? s.error : s.purchase_inner_from}>
    <label>
      {label} {required && <span>*</span>}
    </label>
    <label className="custom-file-upload" style={{ marginTop: "-3px" }}>
      <input type="file" onChange={handleChange} />
      <img src="/assets/icons/selectimg.svg" alt="select img" />
      <span>Выбрать картинку</span>
    </label>
    {errors && <p>{errors.message}</p>}
    {previewImage && (
      <button
        className={s.view_selected_image_btn}
        type="button"
        onClick={() => {
          setIsImageModalOpen(true);
          setSelectedImageSrc(previewImage);
        }}
      >
        Посмотреть выбранную картинку
      </button>
    )}
  </div>
);
