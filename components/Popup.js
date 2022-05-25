export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
}
