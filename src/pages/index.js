import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import User from '../components/User.js';
import {
  validatorSelectors,
  placeForm,
  placeBtnAdd,
  avatarForm,
  avatarBtnEdit,
  profile,
  profileForm,
  profileBtnEdit,
  profileInputName,
  profileInputAvocation
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '027aae2a-5213-4a55-9b05-c413b1c6bf00',
    'Content-Type': 'application/json'
  }
});

function loadInitialData() {
  profile.classList.add('profile_hidden');
  api.getInitialInfo()
    .then( data => {
      user.setUser(data[0])
      placesContainer.renderItems( data[1].reverse() ) ;
      profile.classList.remove('profile_hidden');
    })
    .catch( err => console.log(err) )
}

function generateNewCard(item, userId) {
  const card = new Card({
    handleCardClick: function() {
      popupWithImage.open( this.getInfo() );
    },
    handleLikeBtn: function() {
      if ( this.isLiked() ) {
        api.dislikeCard( this.getId() )
          .then( res => this.setLikes(res.likes) )
          .catch( err => console.log(err) );
      } else {
        api.likeCard( this.getId() )
          .then( res => this.setLikes(res.likes) )
          .catch( err => console.log(err) );
      }
    },
    handleDeleteBtn: function() {
      popupWithConfirmation.open(this);
    },
    card: item,
    templateSelector: '#place-template',
    userId: user.getId()
  });

  return card.generateCard(userId);
}

const placesContainer = new Section(
  (item) => {
    const cardElement = generateNewCard(item, user.getId());
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
          const cardElement = generateNewCard(res, user.getId());
          placesContainer.setItem(cardElement);
          popupWithCardForm.close();
          placeFormValidator.disableButton();
        })
        .catch( errJson =>
          errJson.then( err => popupWithCardForm.showResponseError(err.message) )
        )
        .finally( _ => {
          popupWithCardForm.showSavingState(false, 'Создать')
        })
    },
    popupSelector: '.popup_contains_place-form'
  }
);

const popupWithUserForm = new PopupWithForm(
  {
    submitHandler: (formData) => {
      popupWithUserForm.showSavingState(true);
      api.editProfile({name: formData.name, about: formData.avocation})
        .then( res => {
          user.setInfo(res.name, res.about);
          popupWithUserForm.close();
          profileFormValidator.disableButton();
        })
        .catch( errJson =>
          errJson.then( err => popupWithUserForm.showResponseError(err.message) )
        )
        .finally( _ => {
          popupWithAvatarForm.showSavingState(false, 'Сохранить');
        })
    },
    popupSelector: '.popup_contains_profile-form'
  }
)

const popupWithAvatarForm = new PopupWithForm(
  {
    submitHandler: (formData) => {
      popupWithAvatarForm.showSavingState(true);
      api.editAvatar( {avatar: formData['avatar-src']} )
        .then( res => {
          user.setAvatar(res.avatar);
          popupWithAvatarForm.close();
          avatarFormValidator.disableButton();
        })
        .catch( errJson =>
          errJson.then( err => popupWithAvatarForm.showResponseError(err.message) )
        )
        .finally( _ => {

          popupWithAvatarForm.showSavingState(false, 'Сохранить');
        })
    },
    popupSelector: '.popup_contains_avatar-form'
  }
)

const popupWithConfirmation = new PopupWithConfirmation(
  {
    submitHandler: function() {
      api.deleteCard( this.card.getId() )
      .then( () => {
        this.close();
        this.card.deleteCard();
      })
      .catch( err => console.log(err) )
    },
    popupSelector: '.popup_contains_confirmation'
  }
);

const popupWithImage = new PopupWithImage('.popup_contains_big-img');

const user = new User({
  nameSelector: '.profile__name',
  avocationSelector: '.profile__avocation',
  avatarSelector: '.profile__avatar'
});

popupWithCardForm.setEventListeners();
popupWithUserForm.setEventListeners();
popupWithAvatarForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();

const placeFormValidator = new FormValidator(validatorSelectors, placeForm);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validatorSelectors, avatarForm);
avatarFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validatorSelectors, profileForm);
profileFormValidator.enableValidation();

avatarBtnEdit.addEventListener('click', () => {
  avatarFormValidator.resetError();
  popupWithAvatarForm.open();
});

profileBtnEdit.addEventListener('click', () => {
  let currentUserInfo = user.getInfo();
  profileInputName.value = currentUserInfo.name.trim();
  profileInputAvocation.value = currentUserInfo.avocation.trim();
  profileFormValidator.resetError();
  popupWithUserForm.open();
});

placeBtnAdd.addEventListener('click', () => {
  placeFormValidator.resetError();
  popupWithCardForm.open()
});

loadInitialData();
