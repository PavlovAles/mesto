const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAvocation = profile.querySelector(".profile__avocation");
const profileBtnEdit = profile.querySelector(".profile__btn-edit");

const profilePopup = document.querySelector(".popup_contains_profile-form");
const profileForm = profilePopup.querySelector(".popup__form");
const profileInputName = profileForm.querySelector("#name");
const profileInputAvocation = profileForm.querySelector("#avocation");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupByEsc);
  }
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup__btn-close')) {
    evt.target.closest('.popup').classList.remove("popup_opened");
    evt.target.closest('.popup').removeEventListener('click', closePopupByClick);
  }
  if (evt.currentTarget === evt.target) {
    evt.target.classList.remove("popup_opened");
    evt.target.removeEventListener('click', closePopupByClick);
  }
}

profileBtnEdit.addEventListener("click", function () {
  profileInputName.value = profileName.textContent.trim();
  profileInputAvocation.value = profileAvocation.textContent.trim();

  openPopup(profilePopup);
});

profileForm.addEventListener("submit", profileFormSubmitHandler);

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value.trim();
  profileAvocation.textContent = profileInputAvocation.value.trim();

  closePopup(profilePopup);
}

const placeTemplate = document.querySelector("#place-template").content;
const placesContainer = document.querySelector(".elements__list");
const placePopup = document.querySelector(".popup_contains_place-form");
const placeForm = placePopup.querySelector(".popup__form");
const placeInputName = placeForm.querySelector("#place-name");
const placeInputSrc = placeForm.querySelector("#place-src");
const placeBtnAdd = document.querySelector(".profile__btn-add");

const imgPopup = document.querySelector(".popup_contains_big-img");
const imgCaption = imgPopup.querySelector(".popup__img-caption");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((item) => renderPlaceCard(item.name, item.link));

placeBtnAdd.addEventListener("click", () => openPopup(placePopup));

function renderPlaceCard(placeName, placeSrc) {
  const placeCard = preparePlaceCard(placeName, placeSrc);
  placesContainer.prepend(placeCard);
}

function preparePlaceCard(placeName, placeSrc) {
  const placeCard = placeTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const placeImg = placeCard.querySelector(".elements__img");
  const placeBtnDelete = placeCard.querySelector(".elements__btn-delete");
  const placeBtnLike = placeCard.querySelector(".elements__btn-like");

  placeImg.setAttribute("src", placeSrc);
  placeImg.setAttribute("alt", placeName);
  placeCard.querySelector(".elements__title").textContent = placeName;

  placeImg.addEventListener("click", () => showBigImg(placeName, placeSrc));

  placeBtnDelete.addEventListener("click", function (evt) {
    evt.target.closest(".elements__item").remove();
  });

  placeBtnLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__btn-like_active");
  });

  return placeCard;
}

function showBigImg(placeName, placeSrc) {
  imgPopup.querySelector(".popup__img").setAttribute("src", placeSrc);
  imgPopup.querySelector(".popup__img").setAttribute("alt", placeName);
  imgPopup.querySelector(".popup__img-caption").textContent = placeName;

  openPopup(imgPopup);
}

placeForm.addEventListener("submit", placeFormSubmitHandler);

function placeFormSubmitHandler(evt) {
  evt.preventDefault();

  renderPlaceCard(placeInputName.value, placeInputSrc.value);
  closePopup(placePopup);
  placeForm.reset();
}
