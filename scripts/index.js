const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAvocation = profile.querySelector('.profile__avocation');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');

const profileForm = document.forms['profile-form'];
const profilePopup = profileForm.parentElement.parentElement;
const profileInputName = profileForm.querySelector('#name');
const profileInputAvocation = profileForm.querySelector('#avocation');
const profileBtnClose = profilePopup.querySelector('.popup__btn-close');

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

profileBtnEdit.addEventListener('click', function () {
  togglePopup(profilePopup);

  profileInputName.setAttribute('value', profileName.textContent.trim());
  profileInputAvocation.setAttribute('value', profileAvocation.textContent.trim());
});

profileBtnClose.addEventListener('click', () => togglePopup(profilePopup));

profileForm.addEventListener('submit', profileFormSubmitHandler);

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value.trim();
  profileAvocation.textContent = profileInputAvocation.value.trim();

  togglePopup(profilePopup);
}

const placeTemplate = document.querySelector('#place-template').content;
const placeList = document.querySelector('.elements__list');
const placeForm = document.forms['place-form'];
const placePopup = placeForm.parentElement.parentElement;
const placeInputName = placeForm.querySelector('#place-name');
const placeInputSrc = placeForm.querySelector('#place-src');
const placeBtnClose = placePopup.querySelector('.popup__btn-close');
const placeBtnAdd = document.querySelector('.profile__btn-add');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(item => addPlace(item.name, item.link));

placeBtnAdd.addEventListener('click', () => togglePopup(placePopup));
placeBtnClose.addEventListener('click', () => togglePopup(placePopup));

function addPlace(placeName, placeSrc) {
  const placeCard = placeTemplate.querySelector('.elements__item').cloneNode(true);
  const placeBtnDelete = placeCard.querySelector('.elements__btn-delete');
  const placeBtnLike = placeCard.querySelector('.elements__btn-like');

  placeCard.querySelector('.elements__img').setAttribute('src', placeSrc);
  placeCard.querySelector('.elements__img').setAttribute('alt', placeName);
  placeCard.querySelector('.elements__title').textContent = placeName;

  placeBtnDelete.addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  });

  placeBtnLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__btn-like_active');
  });

  placeList.prepend(placeCard);
}

placeForm.addEventListener('submit', placeFormSubmitHandler);

function placeFormSubmitHandler(evt) {
  evt.preventDefault();

  addPlace(placeInputName.value, placeInputSrc.value);
  togglePopup(placePopup);
  placeInputName.value = '';
  placeInputSrc.value = '';
}

