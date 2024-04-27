import React, { useState } from 'react';
import s from "./modali.module.scss"

const Illinois = ({ formData, handleSubmit, handleChange }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Для клиентов за статой Иллинойс</button>
      {modalOpen && (
        <div className={s.modal}>
          <div className={s.modal_content}>
            <span className={s.close} onClick={closeModal}>&times;</span>
            <div className={s.aaa}>dfgsdfsdfsfsdfsdfsfsdfsd</div>
            <form onSubmit={handleSubmit}>
              <label>
                Full Name:
                <input type="text" name="full_name" value={formData?.full_name} onChange={handleChange} />
              </label>
              <br />
              <label>
                Address:
                <input type="text" name="address" value={formData?.address} onChange={handleChange} />
              </label>
              <br />
              <label>
                Phone Number:
                <input type="text" name="phone_number" value={formData?.phone_number} onChange={handleChange} />
              </label>
              <br />
              <label>
                Cargo Weight:
                <input type="number" name="cargo_weight" value={formData?.cargo_weight} onChange={handleChange} />
              </label>
              <br />
              <label>
                Email:
                <input type="email" name="email" value={formData?.email} onChange={handleChange} />
              </label>
              <br />
              <label>
                Telegram:
                <input type="text" name="telegram" value={formData?.telegram} onChange={handleChange} />
              </label>
              <br />
              <label>
                Whatsapp:
                <input type="text" name="whatsapp" value={formData?.whatsapp} onChange={handleChange} />
              </label>
              <br />
              <label>
                Status:
                <input type="checkbox" name="status" checked={formData?.status} onChange={() => handleChange({ target: { name: 'status', value: !formData?.status } })} />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Illinois;
