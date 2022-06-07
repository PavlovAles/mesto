import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import User from '../components/User.js';
import {
  initialCards,
  validatorSelectors,
  placeForm,
  placeBtnAdd,
  placeBtnSave,
  profile,
  profileForm,
  avatarForm,
  avatarBtnEdit,
  profileBtnEdit,
  profileBtnSave,
  profileInputName,
  profileInputAvocation,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '027aae2a-5213-4a55-9b05-c413b1c6bf00',
    'Content-Type': 'application/json'
  }
});

function loadInitialState() {
  profile.classList.add('profile_hidden');
  api.getInitialInfo()
    .then( data => {
      user.setUser(data[0])
      placesContainer.renderItems(data[1]);
      profile.classList.remove('profile_hidden');
    })
    .catch( err => console.log(err) )
}

function generateNewCard(item) {
  const card = new Card(
    function() {
      popupWithImage.open(this._card.name, this._card.link);
    },
    item,
    '#place-template'
  );

  return card.generateCard();
}

const placesContainer = new Section(
  (item) => {
    const cardElement = generateNewCard(item);
    placesContainer.setItem(cardElement);
  },
  '.elements__list'
  );

const popupWithCardForm = new PopupWithForm(
  {
    submitHandler: (formData) => {
      popupWithCardForm.showSavingState(true);
      api.postCard({name: formData['place-name'], link: formData['place-src']})
        .then( res => {
          const cardElement = generateNewCard(res);
          placesContainer.setItem(cardElement);
        })
        .catch( err => console.log(err))
        .finally( _ => {
          popupWithCardForm.close();
          placeFormValidator.disableButton();
          popupWithCardForm.showSavingState(false, 'Создать')
        })
    }
  },
  '.popup_contains_place-form',
  '.popup__btn-save'
);

const popupWithUserForm = new PopupWithForm(
  {
    submitHandler: (formData) => {
      popupWithUserForm.showSavingState(true);
      api.editProfile({name: formData.name, about: formData.avocation})
        .then( res => {
          user.setUserInfo(res.name, res.about);
        })
        .catch( err => console.log(err))
        .finally( _ => {
          popupWithUserForm.close();
          profileFormValidator.disableButton();
          popupWithAvatarForm.showSavingState(false, 'Сохранить');
        })
    }
  },
  '.popup_contains_profile-form',
  '.popup__btn-save'
)

const popupWithAvatarForm = new PopupWithForm(
  {
    submitHandler: (formData) => {
      popupWithAvatarForm.showSavingState(true);
      api.editAvatar( {avatar: formData['avatar-src']} )
        .then( res => user.setAvatar(res.avatar))
        .catch( err => console.log(err))
        .finally( _ => {
          popupWithAvatarForm.close();
          avatarFormValidator.disableButton();
          popupWithAvatarForm.showSavingState(false, 'Сохранить');
        })
    }
  },
  '.popup_contains_avatar-form',
  '.popup__btn-save'
)

const user = new User( {
  nameSelector: '.profile__name',
  avocationSelector: '.profile__avocation',
  avatarSelector: '.profile__avatar'
} );

const popupWithImage = new PopupWithImage('.popup_contains_big-img');

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
  let currentUserInfo = user.getUserInfo();
  profileInputName.value = currentUserInfo.name.trim();
  profileInputAvocation.value = currentUserInfo.avocation.trim();
  profileFormValidator.resetError();
  popupWithUserForm.open();
});

placeBtnAdd.addEventListener('click', () => {
  placeFormValidator.resetError();
  popupWithCardForm.open()
});

loadInitialState();
