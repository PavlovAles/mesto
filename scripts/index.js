let profile = document.querySelector(".profile");
let infoName = profile.querySelector(".profile__name");
let infoAvocation = profile.querySelector(".profile__avocation");
let btnEdit = profile.querySelector(".profile__btn-edit");

let popup = document.querySelector(".popup");
let popupForm = document.forms["popup-form"];
let inputName = popup.querySelector("#name");
let inputAvocation = popup.querySelector("#avocation");
let btnClose = popup.querySelector(".popup__btn-close");

btnEdit.addEventListener("click", function () {
  togglePopup();

  inputName.setAttribute("value", infoName.textContent.trim());
  inputAvocation.setAttribute("value", infoAvocation.textContent.trim());
});

popupForm.addEventListener("submit", formSubmitHandler);

btnClose.addEventListener("click", togglePopup);

function togglePopup() {
  popup.classList.toggle("popup_opened")
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  infoName.textContent = inputName.value.trim();
  infoAvocation.textContent = inputAvocation.value.trim();

  togglePopup();
}
