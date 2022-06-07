export const validatorSelectors = {
  fieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error'
}

const profilePopup = document.querySelector('.popup_contains_profile-form');
export const profile = document.querySelector('.profile');
export const avatarBtnEdit = profile.querySelector('.profile__avatar-container');
export const avatarForm = document.querySelector('.popup_contains_avatar-form .popup__form');
export const profileBtnEdit = profile.querySelector('.profile__btn-edit');
export const profileForm = profilePopup.querySelector('.popup__form');
export const profileInputName = profileForm.querySelector('#name');
export const profileInputAvocation = profileForm.querySelector('#avocation');
export const profileBtnSave = profileForm.querySelector('.popup__btn-save');

const placePopup = document.querySelector('.popup_contains_place-form');
export const placeBtnAdd = document.querySelector('.profile__btn-add');
export const placeForm = placePopup.querySelector('.popup__form');
export const placeBtnSave = placeForm.querySelector('.popup__btn-save');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
