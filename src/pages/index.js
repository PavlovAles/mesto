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
  avatarForm,
  avatarBtnEdit,
  profileBtnEdit,
  profileBtnSave,
  profileInputName,
  profileInputAvocation,
} from '../utils/constants.js';

function generateNewCard(name, link) {
  const card = new Card(
    function() {
      popupWithImage.open(this._placeName, this._placeSrc);
    },
    name,
    link,
    '#place-template'
  );

  return card.generateCard();
}

const placesContainer = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = generateNewCard(item.name, item.link);
      placesContainer.setItem(cardElement);
    }
  },
  '.elements__list'
);

const popupWithCardForm = new PopupWithForm(
  {
    submitHandler: (formData) => {
      const cardElement = generateNewCard(formData['place-name'], formData['place-src']);
      placesContainer.setItem(cardElement);
      popupWithCardForm.close();
      placeFormValidator.disableButton();
    }
  },
  '.popup_contains_place-form'
);

const popupWithUserForm = new PopupWithForm(
  {
    submitHandler: (formData) => {
      userInfo.setUserInfo(formData.name, formData.avocation);
      popupWithUserForm.close();
      profileFormValidator.disableButton();
    }
  },
  '.popup_contains_profile-form'
)

const popupWithAvatarForm = new PopupWithForm(
  {
    submitHandler: function(){}
  },
  '.popup_contains_avatar-form'
)

const popupWithImage = new PopupWithImage('.popup_contains_big-img');

const userInfo = new UserInfo( {nameSelector: '.profile__name', avocationSelector: '.profile__avocation'} );

popupWithCardForm.setEventListeners();
popupWithUserForm.setEventListeners();
popupWithAvatarForm.setEventListeners();
popupWithImage.setEventListeners();

const placeFormValidator = new FormValidator(validatorSelectors, placeForm);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validatorSelectors, avatarForm);
avatarFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validatorSelectors, profileForm);
profileFormValidator.enableValidation();

avatarBtnEdit.addEventListener('click', function() {
  avatarFormValidator.resetError();
  popupWithAvatarForm.open();
});

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
