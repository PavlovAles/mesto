import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { showPopup, hidePopup } from '../utils/utils.js';

const selectors = {
  fieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
}

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAvocation = profile.querySelector('.profile__avocation');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');
const profilePopup = document.querySelector('.popup_contains_profile-form');
const profileForm = profilePopup.querySelector('.popup__form');
const profileFormValidator = new FormValidator(selectors, profileForm);
const profileInputName = profileForm.querySelector('#name');
const profileInputAvocation = profileForm.querySelector('#avocation');
const profileBtnSave = profileForm.querySelector('.popup__btn-save');

const placesContainer = document.querySelector('.elements__list');
const placeBtnAdd = document.querySelector('.profile__btn-add');
const placePopup = document.querySelector('.popup_contains_place-form');
const placeForm = placePopup.querySelector('.popup__form');
const placeFormValidator = new FormValidator(selectors, placeForm);
const placeInputName = placeForm.querySelector('#place-name');
const placeInputSrc = placeForm.querySelector('#place-src');
const placeBtnSave = placeForm.querySelector('.popup__btn-save');

const initialCards = [
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

const profileFormSubmitHandler = function (evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value.trim();
  profileAvocation.textContent = profileInputAvocation.value.trim();

  hidePopup(profilePopup);
  profileFormValidator.disableButton(profileBtnSave);
};

const placeFormSubmitHandler = function (evt) {
  evt.preventDefault();

  renderPlaceCard(placeInputName.value, placeInputSrc.value);
  hidePopup(placePopup);
  placeForm.reset();
  placeFormValidator.disableButton(placeBtnSave);
};

const renderPlaceCard = function (placeName, placeSrc) {
  const placeCard = new Card(placeName, placeSrc, '#place-template');
  placesContainer.prepend(placeCard.generateCard());
};

profileBtnEdit.addEventListener('click', function () {
  profileInputName.value = profileName.textContent.trim();
  profileInputAvocation.value = profileAvocation.textContent.trim();

  showPopup(profilePopup);
});

profileForm.addEventListener('submit', profileFormSubmitHandler);
profileFormValidator.enableValidation();

placeForm.addEventListener('submit', placeFormSubmitHandler);
placeFormValidator.enableValidation();

placeBtnAdd.addEventListener('click', () => showPopup(placePopup));

initialCards.forEach((item) => renderPlaceCard(item.name, item.link));
