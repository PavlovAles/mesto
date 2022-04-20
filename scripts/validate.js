const enableValidation = function ({ formSelector, fieldsetSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => evt.preventDefault());
    const fieldsetList = Array.from(form.querySelectorAll(fieldsetSelector));
    fieldsetList.forEach((fieldset) => setEventListeners(fieldset, rest));
  });
}

const setEventListeners = function (
  fieldset,
  { inputSelector, submitButtonSelector, ...rest }
) {
  const inputList = Array.from(fieldset.querySelectorAll(inputSelector));
  const button = fieldset.querySelector(submitButtonSelector);
  toggleButtonState(inputList, button, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(fieldset, inputElement, rest);
      toggleButtonState(inputList, button, rest);
    });
  });
}

const checkInputValidity = function (fieldset, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(
      fieldset,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputError(fieldset, inputElement, rest);
  }
}

const showInputError = function (
  fieldset,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = function (
  fieldset,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

const toggleButtonState = function (inputList, button, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    disableButton(button, inactiveButtonClass);
  } else {
    enableButton(button, inactiveButtonClass);
  }
}

const disableButton = function (button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute("disabled", "");
}

const enableButton = function (button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute("disabled", "");
}

const hasInvalidInput = function (inputList) {
  return inputList.some((input) => !input.validity.valid);
}

enableValidation({
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__input-container",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__btn-save",
  inactiveButtonClass: "popup__btn-save_disabled",
  inputErrorClass: "popup__form-item_type_error",
  errorClass: "popup__input-error_active",
});
