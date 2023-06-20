/* Карточки по умолчанию */
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






// Профиль
const nameProfile = document.querySelector(".profile__title");                  
const jobProfile = document.querySelector(".profile__subtitle");
const profileButtonEdit = document.querySelector(".profile__button-edit"); 
const profileButtonAdd = document.querySelector(".profile__button-add");        /*кнопка добавления карточки*/

// Попап профиля
const popupProfile = document.querySelector(".popup.popup__input-profile");     /*Попап изменения профиля*/
const nameInput = document.querySelector(".popup__input_type_name");            /*Инпут имя*/
const jobInput = document.querySelector(".popup__input_type_description");      /*Инпут профессия*/
const buttonSaveProfile = document.querySelector("#save-profile");              /*кнопка сохранить изменения в профиле*/  
const buttonCloseInputProfile = document.querySelector(".popup__button-close_input-profile");      //кнопка закрыть попап профиля
 
// Редактирование карточки            
const popupPlace = document.querySelector(".popup.popup__input-place");                      /*Попап добавления карточки*/
const cardNameInput = document.querySelector(".popup__input_type_card-name");   /*Инпут название места*/
const cardPhotoInput = document.querySelector(".popup__input_type_card-photo"); /*Инпут ссылка на изображение*/
const buttonSavePlace = document.querySelector("#save-place");                  /*кнопка сохранить новую карточку*/
const buttonCloseInputPlace = document.querySelector(".popup__button-close_input-place");      //кнопка закрыть попап профиля


// Попап фото
const popupBigImage = document.querySelector(".popup.popup__big-image");
const namePicturePopup = document.querySelector(".popup__big-image-name");
const picturePopup = document.querySelector(".popup__big-image-photo");
const buttonCloseImage = document.querySelector(".popup__button-close_big-image");          //кнопка закрыть попап с фото

const placesSet = document.querySelector(".places");                            /*Галерея фото*/


function openPopup(popup) {
  popup.classList.add("popup_opened");
} 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция подключает общие стили для попап-окон
function openPopupProfile() {
  openPopup(popupProfile);
}

// функция отключает стили для открытых попап-окон
function closePopupProfile() {
  closePopup(popupProfile);
}

// функция подключает стили для окна попапа новых мест
function openPopupPlace() {
  openPopup(popupPlace);
}

// функция отключает стили для окна попапа новых мест 
function closePopupPlace() {
  closePopup(popupPlace);
}

// функция подключает стили для попапа галереи
function openPopupBigImage() {
  openPopup(popupBigImage);
}

// функция отключает стили для попапа галереи
function closePopupBigImage() {
  closePopup(popupBigImage);
}

profileButtonEdit.addEventListener("click", () => { // открыть редактирование профиля
  nameInput.value = nameProfile.textContent; 
  jobInput.value = jobProfile.textContent;
  openPopup(popupProfile)
});
buttonCloseInputProfile.addEventListener("click", closePopupProfile); // закрыть редактирование профиля
profileButtonAdd.addEventListener("click", openPopupPlace); // открыть форму добавления карточки
buttonCloseInputPlace.addEventListener("click", closePopupPlace); // закрыть форму добавления карточки
buttonCloseImage.addEventListener("click", closePopupBigImage); // закрыть попап с фото

/* функция сохранения информации без обновления страницы*/
function handleFormSubmit(evt) {
  evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopupProfile();
}

/* функция сохранения информации без обновления страницы*/
function handleFormSubmitPlace(evt) {
  evt.preventDefault();

  const newCardElement = createCard(cardPhotoInput.value, cardNameInput.value);
  placesSet.prepend(newCardElement);

  cardPhotoInput.value = '';
  cardNameInput.value = '';
  closePopupPlace();
}

/* слушатели событий, отключающие обновление страницы при сохранении*/
popupProfile.addEventListener("submit", handleFormSubmit);
popupPlace.addEventListener("submit", handleFormSubmitPlace);


const placeTemplate = document.querySelector("#place-template").content;        /*Макет карточки*/

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

function openPhoto(evt) {
  const photoCard = evt.target.closest('.place');
  const photoImage = photoCard.querySelector('.place__photo');
  const photoName = photoCard.querySelector('.place__name');

  openPopupBigImage();
  
    picturePopup.src = photoImage.src;
    picturePopup.alt = photoImage.alt;
    namePicturePopup.textContent = photoName.textContent;
}

function addInitialCards() {
  initialCards.forEach(function(item) {
    const placeElement = createCard(item.link, item.name);
    placesSet.append(placeElement);
  });
}

addInitialCards();

