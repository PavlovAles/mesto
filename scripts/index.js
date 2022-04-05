const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAvocation = profile.querySelector('.profile__avocation');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');

const profileForm = document.forms['profile-form'];
const profilePopup = profileForm.parentElement.parentElement;
const profileInputName = profileForm.querySelector('#name');
const profileInputAvocation = profileForm.querySelector('#avocation');
const profileBtnClose = profilePopup.querySelector('.popup__btn-close');

const placeForm = document.forms['place-form'];
const placePopup = placeForm.parentElement.parentElement;
const placeInputName = placeForm.querySelector('#place-name');
const placeInputSrc = placeForm.querySelector('#place-src');
const placeBtnClose = placePopup.querySelector('.popup__btn-close');
const placeBtnAdd = document.querySelector('.profile__btn-add');

profileBtnEdit.addEventListener('click', function () {
  togglePopup(profilePopup);

  profileInputName.setAttribute('value', profileName.textContent.trim());
  profileInputAvocation.setAttribute('value', profileAvocation.textContent.trim());
});

profileBtnClose.addEventListener('click', () => togglePopup(profilePopup));

profileForm.addEventListener('submit', profileFormSubmitHandler);

placeBtnAdd.addEventListener('click', () => togglePopup(placePopup));
placeBtnClose.addEventListener('click', () => togglePopup(placePopup));

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value.trim();
  profileAvocation.textContent = profileInputAvocation.value.trim();

  togglePopup(profilePopup);
}
