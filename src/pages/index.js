import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  validatorSelectors,
  placeForm,
  placeBtnAdd,
  placeBtnSave,
  profileForm,
  profileBtnEdit,
  profileBtnSave,
  profileInputName,
  profileInputAvocation,
} from '../utils/constants.js';

const placesContainer = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        function() {
          popupWithImage.open(this._placeName, this._placeSrc);
        },
        item.name,
        item.link,
        '#place-template'
      );
      const cardElement = card.generateCard();
      placesContainer.setItem(cardElement);
    }
  },
  '.elements__list'
);

const popupWithCardForm = new PopupWithForm(
  {
    submitHandler: (evt) => {
      evt.preventDefault();
      popupWithCardForm._getInputValues();
      const card = new Card(
        function() {
          popupWithImage.open(this._placeName, this._placeSrc);
        },
        popupWithCardForm._formValues['place-name'],
        popupWithCardForm._formValues['place-src'],
        '#place-template'
      );
      const cardElement = card.generateCard();
      placesContainer.setItem(cardElement);
      popupWithCardForm.close();
      placeFormValidator.disableButton();
    }
  },
  '.popup_contains_place-form'
);

const popupWithUserForm = new PopupWithForm(
  {
    submitHandler: (evt) => {
      evt.preventDefault();
      popupWithUserForm._getInputValues();
      userInfo.setUserInfo(popupWithUserForm._formValues.name, popupWithUserForm._formValues.avocation);
      popupWithUserForm.close();
      profileFormValidator.disableButton();
    }
  },
  '.popup_contains_profile-form'
)

const popupWithImage = new PopupWithImage('.popup_contains_big-img');

const userInfo = new UserInfo( {nameSelector: '.profile__name', avocationSelector: '.profile__avocation'} );

popupWithCardForm.setEventListeners();
popupWithUserForm.setEventListeners();
popupWithImage.setEventListeners();

const placeFormValidator = new FormValidator(validatorSelectors, placeForm);
placeFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validatorSelectors, profileForm);
profileFormValidator.enableValidation();

profileBtnEdit.addEventListener('click', function () {
  let currentUserInfo = userInfo.getUserInfo();
  profileInputName.value = currentUserInfo.name.trim();
  profileInputAvocation.value = currentUserInfo.avocation.trim();
  profileFormValidator.resetError();
  popupWithUserForm.open();
});

placeBtnAdd.addEventListener('click', () => {
  placeFormValidator.resetError();
  popupWithCardForm.open()
});

placesContainer.renderItems();
