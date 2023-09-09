export class UserInfo {
  constructor(selectors) {
    const { nameSelector, aboutSelector, avatarSelector } = selectors;
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(aboutSelector);
    this._avatarEl = document.querySelector(avatarSelector);
  }

  setName(name) {
    this._nameEl.textContent = name;
  }

  setAbout(about) {
    this._aboutEl.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarEl.style.backgroundImage = `url(${avatar})`;
  }

  setAllContent({ name, about, avatar }) {
    this.setName(name);
    this.setAbout(about);
    this.setAvatar(avatar);
  }

  getInfo() {
    return {
      name: this._nameEl.textContent,
      about: this._aboutEl.textContent,
    };
  }
}
