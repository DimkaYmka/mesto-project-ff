import { cardsConteiner, cardTemplate } from '../constants/elements';
import { deleteCard, deleteLike, addLike } from './api';


const createNewCard = (name, link, cardId, likes, openImagePopup, deleteFunction, likeFunction) => {
  const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = name;
  const elementsImage = newCard.querySelector('.card__image');
  elementsImage.src = link;
  elementsImage.alt = name;

  //удалениe карточки 
  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteFunction(newCard, cardId);
  });

  // Отображение количества лайков
  const likesCount = newCard.querySelector('.card__like');
  likesCount.textContent = likes.length;

  // слушатель на большой попап
  elementsImage.addEventListener('click', () => {
    openImagePopup({ name, link })
  });

  const elementsLike = newCard.querySelector('.card__like-button');
  elementsLike.addEventListener('click', () => {
    likeFunction(cardId, elementsLike);
  });

  return newCard;
};

const deleteFunction = (cardToDelete, cardId) => {
  deleteCard(cardId)
    .then(data => {
      console.log('Card deleted successfully:', data);
      cardToDelete.remove();
    })
    .catch(error => {
      console.error('Error deleting card:', error);
    });
};


const likeFunction = (cardId, elementsLike) => {
  const isLiked = elementsLike.classList.contains('card__like-button_is-active');
  const apiMethod = isLiked ? deleteLike : addLike;

  apiMethod(cardId)
    .then(data => {
      console.log('Like action successful:', data);
      // Обновляем состояние кнопки лайка на клиенте
      elementsLike.classList.toggle('card__like-button_is-active', !isLiked);

      // Обновляем счетчик лайков на карточке
      const likesCountElement = elementsLike.parentElement.querySelector('.card__like');
      likesCountElement.textContent = data.likes.length; // Обновляем счетчик на основе данных с сервера
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const renderCard = (name, link, cardId, likes, openImagePopup) => {
  const newCard = createNewCard(name, link, cardId, likes, openImagePopup, deleteFunction, likeFunction);

  cardsConteiner.prepend(newCard);
};



export { createNewCard, renderCard, deleteFunction, likeFunction }
