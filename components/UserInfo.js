export default class UserInfo {
  constructor( {nameSelector, avocationSelector} ) {
    this._nameElement = document.querySelector(nameSelector);
    this._avocationElement = document.querySelector(avocationSelector);
  }

  getUserInfo() {
    return {name: this._nameElement.textContent, avocation: this._avocationElement.textContent}
  }

  setUserInfo(name, avocation) {
    this._nameElement.textContent = name;
    this._avocationElement.textContent = avocation;
  }
}
