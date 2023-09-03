const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: 'e540c1e9-8b28-4703-a61d-9aea54be84ab',
    'Content-Type': 'application/json',
  },
};

class Api {
  checkRes(res) {
    if (res.ok) {
      return res.json();
    } else if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  async getUsersInfo() {
    // загрузка данных профиля
    const res = await fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    });
    return this.checkRes(res);
  }

  async getInitialCards() {
    //загрузка карточек
    const res = await fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    });
    return this.checkRes(res);
  }

  async editProfile({ name, about }) {
    // редактирование профиля
    const res = await fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about }),
    });
    return this.checkRes(res);
  }

  async addNewCard({ name, link }) {
    //загрузка новой карточки
    const res = await fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link }),
    });
    return this.checkRes(res);
  }

  async putLike(cardId) {
    //поставить лайк
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    });
    return this.checkRes(res);
  }

  async deleteLike(cardId) {
    // удалить лайк
    const res = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    });
    return this.checkRes(res);
  }

  async deleteCard(cardId) {
    //удаление карточки
    const res = await fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    });
    return this.checkRes(res);
  }

  async changeAvatar({ avatar }) {
    //поменять аватар
    const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar }),
    });
    return this.checkRes(res);
  }
}

export const api = new Api();
