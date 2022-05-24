import { imgPopup, showPopup } from '../utils/utils.js';

export class Card {
  constructor(placeName, placeSrc, templateSelector) {
    this._placeName = placeName;
    this._placeSrc = placeSrc;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__img').setAttribute('src', this._placeSrc);
    this._element.querySelector('.elements__img').setAttribute('alt', this._placeName);
    this._element.querySelector('.elements__title').textContent = this._placeName;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__img').addEventListener('click', () => this._handleOpenPopup());
    this._element.querySelector('.elements__btn-delete').addEventListener('click', (evt) => this._handleDeleteBtn());
    this._element.querySelector('.elements__btn-like').addEventListener('click', (evt) => this._handleLikeBtn(evt));
  }

  _handleDeleteBtn() {
    this._element.remove();
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle('elements__btn-like_active');
  }

  _handleOpenPopup() {
    imgPopup.querySelector('.popup__img').setAttribute('src', this._placeSrc);
    imgPopup.querySelector('.popup__img').setAttribute('alt', this._placeName);
    imgPopup.querySelector('.popup__img-caption').textContent = this._placeName;

    showPopup(imgPopup);
  }
}
