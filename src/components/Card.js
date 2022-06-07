export default class Card {
  constructor( {handleCardClick, handleLikeBtn, card, templateSelector} ) {
    this._handleCardClick = handleCardClick;
    this._handleLikeBtn = handleLikeBtn;
    this._card = card;
    this._templateSelector = templateSelector;
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__img');
    this._btnLike = this._element.querySelector('.elements__btn-like');

    this._image.setAttribute('src', this._card.link);
    this._image.setAttribute('alt', this._card.name);
    this._element.querySelector('.elements__title').textContent = this._card.name;
    if (this._card.owner._id !== userId) this._element.querySelector('.elements__btn-delete').classList.add('elements__btn-delete_hidden')

    this._setEventListeners();
    this._renderLikes();

    return this._element;
  }

  setLikes(likes) {
    this._card.likes = likes;
    this._renderLikes();
  }

  checkLike() {
    return this._card.likes.some( item => JSON.stringify(item) === JSON.stringify(this._card.owner) )
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

  _renderLikes() {
    this.checkLike() ?
      this._btnLike.classList.add('elements__btn-like_active') :
      this._btnLike.classList.remove('elements__btn-like_active');

    this._element.querySelector('.elements__likes-number').textContent = this._card.likes.length;
  }
}
