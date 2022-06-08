import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector('.popup__img');
    this._caption = this._popup.querySelector('.popup__img-caption');
  }

  open({name, link}) {
    this._img.setAttribute('src', link);
    this._img.setAttribute('alt', name);
    this._caption.textContent = name;

    super.open();
  }
}
