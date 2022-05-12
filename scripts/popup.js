export const imgPopup = document.querySelector('.popup_contains_big-img');

export const showPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByEsc);
};

export const hidePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByEsc = function (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
};

const closePopupByClick = function (evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
    const popup = evt.target.closest('.popup');
    hidePopup(popup);
  }
};
