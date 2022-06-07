import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open({name, link}) {
    this._popup.querySelector('.popup__img').setAttribute('src', link);
    this._popup.querySelector('.popup__img').setAttribute('alt', name);
    this._popup.querySelector('.popup__img-caption').textContent = name;

    super.open();
  }
}
