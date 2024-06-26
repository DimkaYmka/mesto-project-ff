import '../pages/index.css';
import { renderCard, deleteFunction, likeFunction } from '../scripts/card.js';
import { openPopup, closePopup } from '../scripts/modal.js'
import {
  openCardButton, openProfileButtton, inputInfo,
  inputName, nameInfo, jobInfo, popupProfile, cardPopup,
  profileForm, bigPopup, bigImage, bigTitle, placeNameInput, placeUrlInput,
  popupAddCardForm, cardsConteiner, popupAvatar,
  openAvatarButtton, avatarPopup, config
} from "../constants/elements.js";
import { getUserData, getInitialCards, updateProfile, postCard, updateAvatar } from '../scripts/api.js';
import { enableValidation, clearValidation } from '../scripts/validation.js';

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    // Обработка пользовательских данных
    nameInfo.textContent = userData.name;
    jobInfo.textContent = userData.about;
    // Получаем _id пользователя из данных профиля
    const currentUserId = userData._id;
    // Генерируем случайный параметр времени для URL аватара чтобы сбросить картинку из кэша
    const timestamp = Date.now();
    const updatedAvatarUrl = userData.avatar + '?' + timestamp;
    // Обновляем URL аватара на странице
    const profileImage = document.querySelector('.profile__image');
    profileImage.style.backgroundImage = `url('${updatedAvatarUrl}')`;
    // Обработка карточек
    cards.reverse().forEach(card => {
      // Проверяем, создана ли карточка текущим пользователем
      const isCurrentUserCard = card.owner._id === currentUserId;
      // Передаем данные пользователя в renderCard и указываем, является ли текущий пользователь владельцем карточки
      renderCard(card.name, card.link, card._id, card.likes, openImagePopup, userData, isCurrentUserCard);
    });
  })
  .catch(error => {
    console.error('Error fetching user data and initial cards:', error);
  });

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);

//Слушатель на открытие для профиля
openProfileButtton.addEventListener('click', () => {
  inputName.value = nameInfo.textContent;
  inputInfo.value = jobInfo.textContent;
  openPopup(popupProfile)
  clearValidation(profileForm, config);
});

//Слушатель на открытие для профиля
openAvatarButtton.addEventListener('click', () => {
  openPopup(avatarPopup)
});

//Слушатель на сабмит для профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

//Слушатель на сабмит для avatar
popupAvatar.addEventListener('submit', handleAvatarFormSubmit);


//Слушатель на открытие добавления карточек
openCardButton.addEventListener('click', () => {
  openPopup(cardPopup)
  clearValidation(popupAddCardForm, config);
});

function showLoader(button) {
  const buttonText = button.textContent; // Сохраняем текущий текст кнопки
  button.textContent = 'Сохранение...'; // Меняем текст кнопки на "Сохранение..."
  return buttonText; // Возвращаем сохраненный текст кнопки
}

function hideLoader(button, text) {
  button.textContent = text; // Возвращаем текст кнопки к изначальному состоянию
}

function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы
  const submitButton = popupAddCardForm.querySelector('.popup__button'); // Получаем кнопку сохранения
  const buttonText = showLoader(submitButton); // Показываем прелоадер

  // Обработка отправки формы
  const card = {
    name: placeNameInput.value,
    link: placeUrlInput.value
  };

  postCard(card.name, card.link)
    .then(newCard => {
      // console.log('Card created successfully:', newCard);
      // Добавляем созданную карточку
      cardsConteiner.prepend(renderCard(newCard.name, newCard.link, newCard._id, newCard.likes, openImagePopup, deleteFunction, likeFunction));
      closePopup(cardPopup);
      popupAddCardForm.reset();
    })
    .catch(error => {
      console.error('Error creating card:', error);
    })
    .finally(() => {
      // Прячем прелоадер
      hideLoader(submitButton, buttonText);
    });
}



function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const submitButton = profileForm.querySelector('.popup__button'); // Получаем кнопку сохранения
  const buttonText = showLoader(submitButton); // Показываем прелоадер

  const newName = inputName.value;
  const newAbout = inputInfo.value;

  // Обновление профиля
  updateProfile(newName, newAbout)
    .then(userData => {
      // Обновляем информацию о пользователе на странице
      nameInfo.textContent = userData.name;
      jobInfo.textContent = userData.about;
      closePopup(popupProfile);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
    })
    .finally(() => {
      // Прячем прелоадер
      hideLoader(submitButton, buttonText);
    });
}


function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const submitButton = popupAvatar.querySelector('.popup__button'); // Получаем кнопку сохранения
  const buttonText = showLoader(submitButton); // Показываем прелоадер

  const avatarUrl = document.getElementById('place-avatar').value;

  // Обновление аватара
  updateAvatar(avatarUrl)
    .then(userData => {
      // Если запрос успешен, обновляем аватар на странице
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closePopup(avatarPopup);
    })
    .catch(error => {
      console.error('Error updating avatar:', error);
    })
    .finally(() => {
      // Прячем прелоадер
      hideLoader(submitButton, buttonText);
    });
}
//открытие большой картинки
function openImagePopup(dataCard) {
  openPopup(bigPopup)
  // console.log(dataCard.link);
  bigImage.src = dataCard.link;
  bigImage.alt = dataCard.name;
  bigTitle.textContent = dataCard.name;
};



// Вызовем функцию
enableValidation(config)




