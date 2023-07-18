import { openPhoto } from "./index.js";


const placeTemplate = document.querySelector("#place-template").content;        /*Макет карточки*/
const placesSet = document.querySelector(".places");                          /*Галерея фото*/

function createCard(cardPhoto, cardName) {
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

export { placesSet, createCard };
