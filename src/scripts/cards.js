import { cardsConteiner, cardTemplate, profileForm } from '../constants/constants';

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
  }
];

const createNewCard = (name, link, openImagePopup) => {
  const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = name;
  const elementsImage = newCard.querySelector('.card__image');
  elementsImage.src = link;
  elementsImage.alt = name;

  //удалениe карточки 
  const deleteCard = newCard.querySelector('.card__delete-button');
  deleteCard.addEventListener('click', () => {
    newCard.remove();
  });

  // слушатель на большой попап
  elementsImage.addEventListener('click', () => {
    openImagePopup({ name, link })
  });

  //like
  const elementsLike = newCard.querySelector('.card__like-button');

  elementsLike.addEventListener('click', () => {
    elementsLike.classList.toggle('card__like-button_is-active')
  });

  return newCard;
};


const renderCard = (name, link, openImagePopup) => {
  cardsConteiner.prepend(createNewCard(name, link, openImagePopup));
};


export { initialCards, createNewCard, renderCard }
