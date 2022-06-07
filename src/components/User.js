export default class User {
  constructor( {nameSelector, avocationSelector, avatarSelector} ) {
    this._nameElement = document.querySelector(nameSelector);
    this._avocationElement = document.querySelector(avocationSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setUser(user) {
    this._user = user;
    this._renderAvatar();
    this._renderInfo();
  }

  getUserInfo() {
    return {name: this._user.name, avocation: this._user.about}
  }

  getUserId() {
    return this._user._id;
  }

  setAvatar(avatar) {
    this._user.avatar = avatar;
    this._renderAvatar();
  }

  setUserInfo(name, avocation) {
    this._user.name = name;
    this._user.about = avocation;
    this._renderInfo();
  }

  _renderAvatar() {
    this._avatarElement.setAttribute('src', this._user.avatar);
  }

  _renderInfo() {
    this._nameElement.textContent = this._user.name;
    this._avocationElement.textContent = this._user.about;
  }
}
