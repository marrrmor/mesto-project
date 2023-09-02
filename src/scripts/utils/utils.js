import { openPopup, closePopup } from '../modal';
import { popupBigImage, namePicturePopup, picturePopup } from './constants';

export function closePopupBigImage() {
  // функция отключает стили для попапа галереи
  closePopup(popupBigImage);
}

export function openPhoto(evt) {
  const photoCard = evt.target.closest('.place');
  const photoImage = photoCard.querySelector('.place__photo');
  const photoName = photoCard.querySelector('.place__name');

  openPopup(popupBigImage);

  picturePopup.src = photoImage.src;
  picturePopup.alt = photoImage.alt;
  namePicturePopup.textContent = photoName.textContent;
}

export function renderLoading(isLoading, popup) {
  const button = popup.querySelector('.popup__button-save');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = button.value;
  }
}
