// функция подключает общие стили для попап-окон
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown',  closeByEsc);
    document.addEventListener('click',  closeByOverlay);
  } 
  
// функция отключает стили для открытых попап-окон
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown',  closeByEsc);
    document.removeEventListener('click',  closeByOverlay);
}

function closeByEsc(evt) { 
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
} 

function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
} 


export { openPopup, closePopup };

