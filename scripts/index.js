const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAvocation = profile.querySelector(".profile__avocation");
const profileBtnEdit = profile.querySelector(".profile__btn-edit");

const profilePopup = document.querySelector(".popup_contains_profile-form");
const profileForm = profilePopup.querySelector(".popup__form");
const profileInputName = profileForm.querySelector("#name");
const profileInputAvocation = profileForm.querySelector("#avocation");
const profileBtnClose = profilePopup.querySelector(".popup__btn-close");

function openPopup(popup) {
  const button = popup.querySelector('.popup__btn-save');
  button.classList.add('popup__btn-save_disabled');
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

profileBtnEdit.addEventListener("click", function () {
  profileInputName.value = profileName.textContent.trim();
  profileInputAvocation.value = profileAvocation.textContent.trim();

  openPopup(profilePopup);
});

profileBtnClose.addEventListener("click", () => closePopup(profilePopup));

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
const placeBtnClose = placePopup.querySelector(".popup__btn-close");
const placeBtnAdd = document.querySelector(".profile__btn-add");

const imgPopup = document.querySelector(".popup_contains_big-img");
const imgBtnClose = imgPopup.querySelector(".popup__btn-close");
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
placeBtnClose.addEventListener("click", () => closePopup(placePopup));

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

imgBtnClose.addEventListener("click", () => closePopup(imgPopup));

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
  placeInputName.value = "";
  placeInputSrc.value = "";
}
