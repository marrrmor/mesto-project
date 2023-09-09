export class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = [];
  }

  _clear() {
    this._container.innerHTML = '';
  }

  prependItem(item) {
    this._items.unshift(item);
    this._container.prepend(item);
  }

  appendItem(item) {
    this._items.push(item);
    this._container.append(item);
  }

  renderItems(items) {
    this._items = items;
    this._clear();

    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.append(item));
    this._container.append(fragment);
  }
}
