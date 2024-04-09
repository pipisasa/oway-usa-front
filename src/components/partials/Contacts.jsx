import React, { useEffect, useRef, useState } from 'react';
import s from '@/styles/partials/Contact.module.scss';
import Button from './Button';
import { getCookie } from '../../utils/cookieHelpers';
import { Slide, Slider } from './Slider';
// import { Copy } from './';

export default function Contacts() {
  const [state, setState] = useState();
  const isAuthenticated = !!getCookie('accessToken');
  const slideWidth = 700;
  const sliderRef = useRef(null);

  const handlePrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -slideWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: slideWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setState(true);
    }
  }, [isAuthenticated]);
  const warehouses = [
    {
      img: 'assets/icons/footer/usa.svg',
      title: 'Главный офис',
      address: '4730d Kimball Ave',
      state: 'Illinois',
      phone: '872 710 07 10',
      city: 'Chicago',
      zip: '60625',
      email: 'owayusa1@gmail.com',
    },
    {
      img: 'assets/icons/footer/usa.svg',
      title: 'Пункты приема в Чикаго:',
      address: '1550 Oak Brook',
      state: 'Illinois',
      phone: '872 710 07 10',
      city: '205',
      zip: '60625',
      email: 'owayusa1@gmail.com',
    },
    {
      img: 'assets/icons/footer/usa.svg',
      title: 'Пункт приема онлайн заказов в Delaware',
      address: '4730d Kimball Ave',
      state: 'Turkey',
      phone: '872 710 07 10',
      city: 'Chicago',
      zip: '34130',
      email: 'owayusa1@gmail.com',
    },
    {
      img: 'assets/icons/footer/turkey.svg',
      title: 'Адрес склада в Турции',
      address: 'Nişanca, Hemşire Sk.  ',
      state: 'Illinois',
      phone: '872 710 07 10',
      city: 'Istanbul',
      zip: '34130',
      email: 'owayusa1@gmail.com',
    },
  ];

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data).then(
      () => {
        alert('Данные скопированы в буфер обмена!');
      },
      (err) => {
        console.error('Ошибка при копировании: ', err);
      }
    );
  };
  const handleCopyClick = (warehouse) => {
    const data = `Адрес: ${warehouse.address}, Штат: ${warehouse.state}, Город: ${warehouse.city}, ZIP-код: ${warehouse.zip}, Телефон: ${warehouse.phone}, Email: ${warehouse.email}`;
    copyToClipboard(data);
  };

  const Copy = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#027DDB" />
      <path
        opacity="0.997"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.3862 9C16.6284 9 18.8706 9 21.1128 9C21.8441 9.19821 22.277 9.67216 22.4116 10.4219C22.4299 12.9739 22.4299 15.526 22.4116 18.0781C22.299 18.7832 21.9025 19.2435 21.2222 19.459C20.0611 19.4905 18.899 19.5042 17.7359 19.5C16.5727 19.5042 15.4106 19.4905 14.2495 19.459C13.67 19.2805 13.2918 18.9023 13.1148 18.3242C13.0695 15.6546 13.0604 12.984 13.0874 10.3125C13.2519 9.60574 13.6848 9.16824 14.3862 9Z"
        fill="white"
      />
      <path
        opacity="0.996"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.7617 23C16.1367 23 13.5117 23 10.8867 23C10.1846 22.831 9.75161 22.3935 9.58789 21.6875C9.56966 18.862 9.56966 16.0365 9.58789 13.2109C9.77741 12.4745 10.2468 12.0416 10.9961 11.9121C11.397 11.8984 11.7981 11.8939 12.1992 11.8984C12.1947 13.8946 12.1992 15.8907 12.2129 17.8867C12.2699 19.0175 12.8214 19.7968 13.8672 20.2246C14.0109 20.2696 14.1567 20.3061 14.3047 20.334C16.2274 20.3738 18.1506 20.3875 20.0742 20.375C20.0788 20.8126 20.0742 21.2501 20.0605 21.6875C19.8954 22.395 19.4624 22.8325 18.7617 23Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className={`${s.contacts} container`}>
      <div className={s.df}>
        <div>
          <p>Контакты</p>
          <h1>Связаться с нами</h1>
        </div>
        <div className={s.current_header_icon}>
          <button onClick={handlePrevSlide}>
            <img src="assets/icons/arrowLeft.svg" alt="" />
          </button>
          <button onClick={handleNextSlide}>
            <img src="assets/icons/arrowRight.svg" alt="" />
          </button>
        </div>
      </div>
      <div
        className={s.contact_inner}
        ref={sliderRef}
        style={{
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          alignSelf: 'stretch',
          scrollSnapType: 'x mandatory',
        }}>
        {warehouses.map((warehouse) => (
          <div className={s.contact_inner_block}>
            <div className={s.contact_inner_block_text}>
              <div className={s.contact_inner_block_text_inner}>
                <img src={warehouse.img} alt="" />
                <h2>{warehouse.title}</h2>
              </div>
              <div onClick={() => handleCopyClick(warehouse)} className={s.svg}>
                <Copy />
              </div>
            </div>
            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_address.svg" alt="" />
                <p>Address</p>
                <h3>{warehouse.address}</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_city.svg" alt="" />
                <p>City</p>
                <h3>{warehouse.city}</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_america.svg" alt="" />
                <p>State</p>
                <h3>{warehouse.state}</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_zip-code.svg" alt="" />
                <p>Zip code</p>
                <h3>{warehouse.zip}</h3>
              </div>
            </div>

            <div className={s.contact_inner_block_infos}>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_call.svg" alt="" />
                <p>Number</p>
                <h3>{warehouse.phone}</h3>
              </div>
              <div className={s.contact_inner_block_info}>
                <img src="assets/icons/contact_email.svg" alt="" />
                <p>Mail</p>
                <h3>{warehouse.email}</h3>
              </div>
            </div>
          </div>
        ))}
        <Slider>
          {warehouses.map((warehouse, index) => (
            <div className={s.contact_inner_block1}>
              <div className={s.contact_inner_block_text}>
                <div className={s.contact_inner_block_text_inner}>
                  <img src={warehouse.img} alt="" />
                  <h2>{warehouse.title}</h2>
                </div>
                <div
                  onClick={() => handleCopyClick(warehouse)}
                  className={s.svg}>
                  <Copy />
                </div>
              </div>
              <div className={s.contact_inner_block_infos}>
                <div className={s.contact_inner_block_info}>
                  <img src="assets/icons/contact_address.svg" alt="" />
                  <p>Address</p>
                  <h3>{warehouse.address}</h3>
                </div>
                <div className={s.contact_inner_block_info}>
                  <img src="assets/icons/contact_city.svg" alt="" />
                  <p>City</p>
                  <h3>{warehouse.city}</h3>
                </div>
              </div>

              <div className={s.contact_inner_block_infos}>
                <div className={s.contact_inner_block_info}>
                  <img src="assets/icons/contact_america.svg" alt="" />
                  <p>State</p>
                  <h3>{warehouse.state}</h3>
                </div>
                <div className={s.contact_inner_block_info}>
                  <img src="assets/icons/contact_zip-code.svg" alt="" />
                  <p>Zip code</p>
                  <h3>{warehouse.zip}</h3>
                </div>
              </div>

              <div className={s.contact_inner_block_infos}>
                <div className={s.contact_inner_block_info}>
                  <img src="assets/icons/contact_call.svg" alt="" />
                  <p>Number</p>
                  <h3>{warehouse.phone}</h3>
                </div>
                <div className={s.contact_inner_block_info}>
                  <img src="assets/icons/contact_email.svg" alt="" />
                  <p>Mail</p>
                  <h3>{warehouse.email}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
