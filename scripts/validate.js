function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(form => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    const fieldsetList = Array.from(form.querySelectorAll('.popup__input-container'));
    fieldsetList.forEach(fieldset => setEventListeners(fieldset));
  });
}

function setEventListeners(fieldset) {
  const inputList = Array.from(fieldset.querySelectorAll('.popup__form-item'));
  const button = fieldset.querySelector('.popup__btn-save');
  toggleButtonState(inputList, button);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(fieldset, inputElement);
      toggleButtonState(inputList, button);
    })
  })
}

function checkInputValidity(fieldset, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(fieldset, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(fieldset, inputElement)
  }
}

function showInputError(fieldset, inputElement, errorMessage) {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(fieldset, inputElement) {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-item_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function toggleButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) button.classList.add('popup__btn-save_disabled')
  else button.classList.remove('popup__btn-save_disabled')
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

enableValidation();
