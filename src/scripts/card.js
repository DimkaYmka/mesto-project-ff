import { cardsConteiner, cardTemplate, profileForm } from '../constants/elements';
import { initialCards } from './cards';


const createNewCard = (name, link, openImagePopup, deleteFunction, likeFunction) => {
  const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = name;
  const elementsImage = newCard.querySelector('.card__image');
  elementsImage.src = link;
  elementsImage.alt = name;

  //удалениe карточки 
  const deleteCard = newCard.querySelector('.card__delete-button');
  deleteCard.addEventListener('click', () => {
    deleteFunction(newCard);
  });

  // слушатель на большой попап
  elementsImage.addEventListener('click', () => {
    openImagePopup({ name, link })
  });

  const elementsLike = newCard.querySelector('.card__like-button');
  elementsLike.addEventListener('click', () => {
    likeFunction(elementsLike);
  });

  return newCard;
};

const deleteFunction = (cardToDelete) => {
  cardToDelete.remove();
};

const likeFunction = (elementsLike) => {
  elementsLike.classList.toggle('card__like-button_is-active');
};


const renderCard = (name, link, openImagePopup) => {
  cardsConteiner.prepend(createNewCard(name, link, openImagePopup, deleteFunction, likeFunction));
};


export { initialCards, createNewCard, renderCard, deleteFunction, likeFunction }
