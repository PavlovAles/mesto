import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // constructor(popupSelector) {
  //   super(popupSelector);
  //   this._placeSrc = placeSrc;
  //   this._placeName = placeName;
  // }

  open(placeName, placeSrc) {
    this._popup.querySelector('.popup__img').setAttribute('src', placeSrc);
    this._popup.querySelector('.popup__img').setAttribute('alt', placeName);
    this._popup.querySelector('.popup__img-caption').textContent = placeName;

    super.open();
  }
}
