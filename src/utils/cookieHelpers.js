/**
 * Создает или обновляет куку с указанным именем и значением.
 *
 * @param {string} name - Имя куки.
 * @param {string} value - Значение куки.
 * @param {number} [days=7] - Количество дней, на которое кука будет действительна.
 */
export const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Возвращает значение куки с указанным именем.
 * Если кука с таким именем не существует, возвращает null.
 *
 * @param {string} name - Имя куки.
 * @returns {string|null} Значение куки или null, если куки не существует.
 */
export const getCookie = (name) => {
  // Проверяем, выполняется ли код в браузере
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  return null;
};

/**
 * Удаляет куку с указанным именем.
 *
 * @param {string} name - Имя куки.
 */
export const deleteCookie = (name) => {
  setCookie(name, "", -1);
};
