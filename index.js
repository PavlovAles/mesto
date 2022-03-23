let profile = document.querySelector(".profile");
let infoName = profile.querySelector(".profile__name");
let infoAvocation = profile.querySelector(".profile__avocation");
let btnEdit = profile.querySelector(".profile__btn-edit");

let popup = document.querySelector(".popup");
let inputName = popup.querySelector('.popup__form-item[id="name"]');
let inputAvocation = popup.querySelector('.popup__form-item[id="avocation"]');
let btnSave = popup.querySelector(".popup__btn-save");
let btnClose = popup.querySelector(".popup__btn-close");

btnEdit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  inputName.setAttribute("value", infoName.textContent.trim());
  inputAvocation.setAttribute("value", infoAvocation.textContent.trim());
});

btnSave.addEventListener("click", formSubmitHandler);

btnClose.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  infoName.textContent = inputName.value.trim();
  infoAvocation.textContent = inputAvocation.value.trim();
}
