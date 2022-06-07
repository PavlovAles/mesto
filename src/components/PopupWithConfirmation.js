import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor( {submitHandler, popupSelector} ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

  open(card) {
    this.card = card;
    super.open()
  }
}
