export default class Profile {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameEl = document.querySelector(nameSelector);
    this._descriptionEl = document.querySelector(descriptionSelector);
    this._avatarEl = document.querySelector(avatarSelector);
  }

  get name() {
    return this._nameEl.textContent;
  }

  get description() {
    return this._descriptionEl.textContent;
  }

  setData({ name, about, avatar }) {
    if (name) this._nameEl.textContent = name;
    if (about) this._descriptionEl.textContent = about;
    if (avatar) this._avatarEl.style.backgroundImage = `url('${avatar}')`;
  }
}
