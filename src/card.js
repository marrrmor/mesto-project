import { openPhoto } from './modal.js';



const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  const placeTemplate = document.querySelector("#place-template").content;        /*Макет карточки*/
  export const placesSet = document.querySelector(".places");                          /*Галерея фото*/

  export function createCard(cardPhoto, cardName) {
    const cardElement = placeTemplate.querySelector(".place").cloneNode(true);     /*Клонирование элементов*/
    const itemCard = cardElement.querySelector(".place__photo");
  
    itemCard.src = cardPhoto;
    itemCard.alt = cardName + " фотография";
    cardElement.querySelector(".place__name").textContent = cardName;
  
    cardElement.querySelector(".place__button-like").addEventListener("click", function(evt) {
      evt.target.classList.toggle("place__button-like_active");
    });
  
     cardElement.querySelector(".place__button-delete").addEventListener("click", function(evt) {
      evt.target.closest(".place").remove();
    });
  
    itemCard.addEventListener('click', openPhoto);
      
    return cardElement;
  }

  export function addInitialCards() {
    initialCards.forEach(function(item) {
      const placeElement = createCard(item.link, item.name);
      placesSet.append(placeElement);
    });
  }