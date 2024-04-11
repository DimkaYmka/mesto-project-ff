import { cardsConteiner, cardTemplate } from '../constants/elements';
import { deleteCard, deleteLike, addLike } from './api';


const deleteFunction = (cardToDelete, cardId) => {
  deleteCard(cardId)
    .then(data => {
      // console.log('Card deleted successfully:', data);
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
      // console.log('Like action successful:', data);
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

const createNewCard = (name, link, cardId, likes, openImagePopup, deleteFunction, likeFunction, currentUser, isCurrentUserCard) => {
  // Клонируем шаблон карточки
  const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);

  // Устанавливаем заголовок карточки
  newCard.querySelector('.card__title').textContent = name;

  // Устанавливаем изображение и его атрибуты
  const elementsImage = newCard.querySelector('.card__image');
  elementsImage.src = link;
  elementsImage.alt = name;

  // Находим кнопку удаления карточки и добавляем обработчик события удаления
  const deleteButton = newCard.querySelector('.card__delete-button');
  if (isCurrentUserCard) {
    deleteButton.addEventListener('click', () => {
      deleteFunction(newCard, cardId);
    });
  } else {
    deleteButton.style.display = 'none'; // Скрываем кнопку удаления
  }

  // Отображаем количество лайков
  const likesCount = newCard.querySelector('.card__like');
  likesCount.textContent = likes.length;

  // Находим кнопку лайка
  const elementsLike = newCard.querySelector('.card__like-button');

  // Если текущий пользователь авторизован, устанавливаем состояние активности кнопки лайка
  if (currentUser) {
    const isLikedByCurrentUser = likes.some(like => like._id === currentUser._id);
    if (isLikedByCurrentUser) {
      elementsLike.classList.add('card__like-button_is-active');
    }

    // Добавляем обработчик события клика по кнопке лайка
    elementsLike.addEventListener('click', () => {
      likeFunction(cardId, elementsLike);
      elementsLike.classList.toggle('card__like-button_is-active');
    });
  }

  // Добавляем обработчик события клика по изображению для открытия попапа
  elementsImage.addEventListener('click', () => {
    openImagePopup({ name, link });
  });

  return newCard;
};

const renderCard = (name, link, cardId, likes, openImagePopup, userData, isCurrentUserCard) => {
  // Создаем новую карточку
  const newCard = createNewCard(name, link, cardId, likes, openImagePopup, deleteFunction, likeFunction, userData, isCurrentUserCard);

  cardsConteiner.prepend(newCard);
  // Определяем, была ли карточка лайкнута текущим пользователем и прочие действия...
};


export { createNewCard, renderCard, deleteFunction, likeFunction }




