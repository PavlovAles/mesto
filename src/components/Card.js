export default class Card {
  constructor(handleCardClick, card, templateSelector) {
    this._handleCardClick = handleCardClick;
    this._card = card;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__img');

    this._setEventListeners();

    this._image.setAttribute('src', this._card.link);
    this._image.setAttribute('alt', this._card.name);
    this._element.querySelector('.elements__title').textContent = this._card.name;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick());
    this._element.querySelector('.elements__btn-delete').addEventListener('click', (evt) => this._handleDeleteBtn());
    this._element.querySelector('.elements__btn-like').addEventListener('click', (evt) => this._handleLikeBtn(evt));
  }

  _handleDeleteBtn() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle('elements__btn-like_active');
  }
}
