const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-27",
    headers: {
        authorization: "e540c1e9-8b28-4703-a61d-9aea54be84ab",
        'Content-Type': 'application/json'
    }
}


export function getUsersInfo() {// загрузка данных профиля
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      else if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    }


export function getInitialCards() {//загрузка карточек
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      else if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    }


export function editProfile({name, about}) {// редактирование профиля
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, about}),
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        else if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }


export function addNewCard({name, link}) {//загрузка новой карточки
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({name, link}),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
    

export function putLike(cardId) {//поставить лайк
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        else if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }


export function deleteLike(cardId) {// удалить лайк
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }


export function deleteCard(cardId) {//удаление карточки
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  
export function changeAvatar({avatar}) { //поменять аватар
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar})
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }