function enableValidation({formSelector, fieldsetSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    const fieldsetList = Array.from(form.querySelectorAll(fieldsetSelector));
    fieldsetList.forEach(fieldset => setEventListeners(fieldset, rest));
  });
}

function setEventListeners(fieldset, {inputSelector, submitButtonSelector, ...rest}) {
  const inputList = Array.from(fieldset.querySelectorAll(inputSelector));
  const button = fieldset.querySelector(submitButtonSelector);
  toggleButtonState(inputList, button, rest);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(fieldset, inputElement, rest);
      toggleButtonState(inputList, button, rest);
    })
  })
}

function checkInputValidity(fieldset, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(fieldset, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(fieldset, inputElement, rest)
  }
}

function showInputError(fieldset, inputElement, errorMessage, {inputErrorClass, errorClass}) {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(fieldset, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function toggleButtonState(inputList, button, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) button.classList.add(inactiveButtonClass)
  else button.classList.remove(inactiveButtonClass)
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

enableValidation({
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
});
