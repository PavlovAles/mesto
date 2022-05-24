export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._itemsArray.forEeach((item) => this._renderer(item));
  }

  addItem(item) {
    this._container.append(item);
  }
}
