import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import usePurchase from "@/hooks/usePurchase";
import s from "@/styles/components/shared/modals/MyRequests.module.scss";
import { useModal } from "@/hooks/modals/useModal";
import ImagePreviewModal from "../../ImagePreviewModal";
import PurchaseModal from "../../main/PurchaseModal";
import { RxCross1 } from "react-icons/rx";

export default function MyRequestsModal() {
  const { handleChange, submitPurchase, isSubmitted, isLoading } =
    usePurchase();
  const {
    isOpen: isMainModalOpen,
    openModal: openMainModal,
    closeModal: closeMainModal,
  } = useModal();
  const {
    isOpen: isImagePreview1Open,
    openModal: openImagePreview1,
    closeModal: closeImagePreview1,
  } = useModal();
  const {
    isOpen: isImagePreview2Open,
    openModal: openImagePreview2,
    closeModal: closeImagePreview2,
  } = useModal();
  const {
    isOpen: isPurchaseModalOpen,
    openModal: openPurchaseModal,
    closeModal: closePurchaseModal,
  } = useModal();

  const [mobileForm, setMobileForm] = useState(false);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleMobileForm = useCallback(() => {
    setMobileForm((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      openPurchaseModal();
    }
  }, [isSubmitted, openPurchaseModal]);

  const handleFileChange1 = useCallback(
    (e) => {
      const file = e.target.files[0];
      setSelectedFile1(file);
      setPreviewImage1(URL.createObjectURL(file));
      openImagePreview1();
    },
    [openImagePreview1]
  );

  const handleFileChange2 = useCallback(
    (e) => {
      const file = e.target.files[0];
      setSelectedFile2(file);
      setPreviewImage2(URL.createObjectURL(file));
      openImagePreview2();
    },
    [openImagePreview2]
  );

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
                        placeholder="Введите ФИО"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        required
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="url"
                        name="url"
                        label="Ссылка на товар"
                        placeholder="https://"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        required
                      />
                    </div>

                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="name_of_purchase"
                        name="name_of_purchase"
                        label="Название товара, как в магазине"
                        placeholder="Введите название товара"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        required
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="count"
                        name="count"
                        label="Количество"
                        placeholder="Введите количество"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        required
                      />
                    </div>

                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="email"
                        name="email"
                        label="Электронная почта"
                        placeholder="Введите электронную почту"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        required
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="description"
                        name="description"
                        label="Комментарий к товару"
                        placeholder="Введите комментарий"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        required
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="telegram"
                        name="telegram"
                        label="Telegram"
                        placeholder="Введите @username"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        icon="/assets/icons/telegram.svg"
                      />
                    </div>
                    <div className={s.purchase_inner_froms}>
                      <InputField
                        id="phone_number"
                        name="phone_number"
                        label="WhatsApp"
                        placeholder="Введите номер телефона"
                        errors={errors}
                        handleChange={handleChange}
                        register={register}
                        icon="/assets/icons/whatsapp.svg"
                      />
                    </div>

                    <FileInputField
                      label="Добавьте первый скриншот"
                      handleChange={handleFileChange1}
                      errors={errors}
                      previewImage={previewImage1}
                      closeModal={closeImagePreview1}
                      isOpen={isImagePreview1Open}
                      required
                    />

                    {selectedFile1 && (
                      <FileInputField
                        label="Добавьте второй скриншот"
                        handleChange={handleFileChange2}
                        errors={errors}
                        previewImage={previewImage2}
                        closeModal={closeImagePreview2}
                        isOpen={isImagePreview2Open}
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
  required,
  icon,
}) => (
  <div className={errors?.[name] ? s.error : s.purchase_inner_froms_inputs}>
    <label>
      {label} {required && <span>*</span>}
    </label>
    <div className={icon ? s.icon_input : ""}>
      {icon && <img src={icon} alt={name} />}
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        {...register(name, { required })}
      />
    </div>
    {errors?.[name] && <p>Это поле обязательно к заполнению!</p>}
  </div>
);

const FileInputField = ({
  label,
  handleChange,
  errors,
  previewImage,
  closeModal,
  isOpen,
  required,
}) => (
  <div className={errors?.purchase_image ? s.errorr : s.purchase_inner_from}>
    <label>
      {label} {required && <span>*</span>}
    </label>
    <label className="custom-file-upload" style={{ marginTop: "-3px" }}>
      <input type="file" onChange={handleChange} />
      <img src="/assets/icons/selectimg.svg" alt="select img" />
      <span>Выбрать картинку</span>
    </label>
    {errors?.purchase_image && <p>Выберите фото обязательно!</p>}
    {isOpen && previewImage && (
      <ImagePreviewModal previewImage={previewImage} onClose={closeModal} />
    )}
  </div>
);
