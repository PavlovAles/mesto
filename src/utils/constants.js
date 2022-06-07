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
export const avatarForm = document.querySelector('.popup_contains_avatar-form .popup__form');
export const avatarBtnEdit = profile.querySelector('.profile__avatar-container');
export const profileBtnEdit = profile.querySelector('.profile__btn-edit');
export const profileForm = profilePopup.querySelector('.popup__form');
export const profileInputName = profileForm.querySelector('#name');
export const profileInputAvocation = profileForm.querySelector('#avocation');

const placePopup = document.querySelector('.popup_contains_place-form');
export const placeBtnAdd = document.querySelector('.profile__btn-add');
export const placeForm = placePopup.querySelector('.popup__form');
