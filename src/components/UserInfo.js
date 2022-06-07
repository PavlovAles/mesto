export default class UserInfo {
  constructor( {nameSelector, avocationSelector, avatarSelector} ) {
    this._nameElement = document.querySelector(nameSelector);
    this._avocationElement = document.querySelector(avocationSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {name: this._nameElement.textContent, avocation: this._avocationElement.textContent}
  }

  setAvatar(avatar) {
    this._avatarElement.setAttribute('src', avatar);
  }

  setUserInfo(name, avocation) {
    this._nameElement.textContent = name;
    this._avocationElement.textContent = avocation;
  }
}
