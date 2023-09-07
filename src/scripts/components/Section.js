//export * from './Card';
//export * from './Popup';
//export * from './Form';
//export * from './Profile';

export class Section {
  constructor({ /*items, */ renderer }, containerSelector) {
    //this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }
  /*renderItems(_renderedItems) {
    this._renderedItems.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }*/

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
