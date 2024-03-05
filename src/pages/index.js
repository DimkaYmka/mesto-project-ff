import '../pages/index.css';
import { renderCard, deleteFunction, likeFunction } from '../scripts/card.js';
import { openPopup, closePopup } from '../scripts/modal.js'
import {
  openCardButton, openProfileButtton, inputInfo,
  inputName, nameInfo, jobInfo, popupProfile, cardPopup,
  profileForm, bigPopup, bigImage, bigTitle, placeNameInput, placeUrlInput,
  popupAddCardForm, cardsConteiner, popupAvatar,
  forms, openAvatarButtton, avatarPopup
} from "../constants/elements.js";
import { getUserData, getInitialCards, updateProfile, postCard, updateAvatar } from '../scripts/api.js';
import { enableValidation } from '../scripts/validation.js';


getUserData().then(userData => {
  nameInfo.textContent = userData.name;
  jobInfo.textContent = userData.about;

  // Генерируем случайный параметр времени для URL аватара чтобы сбросить картинку из кэша
  const timestamp = Date.now();
  const updatedAvatarUrl = userData.avatar + '?' + timestamp;

  // Обновляем URL аватара на странице
  const profileImage = document.querySelector('.profile__image');
  profileImage.style.backgroundImage = `url('${updatedAvatarUrl}')`;
});

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);

//Слушатель на открытие для профиля
openProfileButtton.addEventListener('click', () => {
  inputName.value = nameInfo.textContent;
  inputInfo.value = jobInfo.textContent;
  openPopup(popupProfile)
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
});

// function handleCardFormSubmit(evt) {
//   evt.preventDefault(); // Отменяем стандартное поведение формы
//   const submitButton = popupAddCardForm.querySelector('.popup__button'); // Получаем кнопку сохранения
//   const buttonText = submitButton.textContent; // Сохраняем текущий текст кнопки
//   submitButton.textContent = 'Сохранение...'; // Меняем текст кнопки на "Сохранение..."
//   // Обработка отправки формы
//   const card = {
//     name: placeNameInput.value,
//     link: placeUrlInput.value
//   };
  
//   postCard(card.name, card.link)
//     .then(data => {
//       console.log('Card created successfully:', data);
//       // Добавляем созданную карточку
//       cardsConteiner.prepend(renderCard(card.name, card.link, [], openImagePopup, deleteFunction, likeFunction));
//       closePopup(cardPopup);
//       popupAddCardForm.reset();
//     })
//     .catch(error => {
//       console.error('Error creating card:', error);
//       // Здесь можно обработать ошибку, если она возникла при создании карточки на сервере
//     })
//     .finally(() => {
//       // Возвращаем текст кнопки к изначальному состоянию
//       submitButton.textContent = buttonText;
//     });
// }

// // слушатель формы
// // forms.forEach((formElement) => {
// //   formElement.addEventListener('submit', (e) => {
// //     e.preventDefault();
// //   })
// // })

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault(); // Отменяем стандартное поведение формы
  
//   const submitButton = profileForm.querySelector('.popup__button'); // Получаем кнопку сохранения
//   const buttonText = submitButton.textContent; // Сохраняем текущий текст кнопки
  
//   submitButton.textContent = 'Сохранение...'; // Меняем текст кнопки на "Сохранение..."
  
//   const newName = inputName.value;
//   const newAbout = inputInfo.value;
  
//   // Обновление профиля
//   updateProfile(newName, newAbout)
//     .then(() => {
//       // Обновляем информацию о пользователе на странице
//       nameInfo.textContent = newName;
//       jobInfo.textContent = newAbout;
//       closePopup(popupProfile);
//     })
//     .catch(error => {
//       console.error('Error updating profile:', error);
//     })
//     .finally(() => {
//       // Возвращаем текст кнопки к изначальному состоянию
//       submitButton.textContent = buttonText;
//     });
// }

// function handleAvatarFormSubmit(evt) {
//   evt.preventDefault(); // Отменяем стандартное поведение формы
  
//   const submitButton = popupAvatar.querySelector('.popup__button'); // Получаем кнопку сохранения
//   const buttonText = submitButton.textContent; // Сохраняем текущий текст кнопки
  
//   submitButton.textContent = 'Сохранение...'; // Меняем текст кнопки на "Сохранение..."
  
//   const avatarUrl = document.getElementById('place-avatar').value;
  
//   // Обновление аватара
//   updateAvatar(avatarUrl)
//     .then(() => {
//       // Если запрос успешен, обновляем аватар на странице
//       const profileImage = document.querySelector('.profile__image');
//       profileImage.style.backgroundImage = `url('${avatarUrl}')`;
//       closePopup(avatarPopup);
//     })
//     .catch(error => {
//       console.error('Error updating avatar:', error);
//     })
//     .finally(() => {
//       // Возвращаем текст кнопки к изначальному состоянию
//       submitButton.textContent = buttonText;
//     });
// }

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
    .then(data => {
      console.log('Card created successfully:', data);
      // Добавляем созданную карточку
      cardsConteiner.prepend(renderCard(card.name, card.link, [], openImagePopup, deleteFunction, likeFunction));
      closePopup(cardPopup);
      popupAddCardForm.reset();
    })
    .catch(error => {
      console.error('Error creating card:', error);
      // Здесь можно обработать ошибку, если она возникла при создании карточки на сервере
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
    .then(() => {
      // Обновляем информацию о пользователе на странице
      nameInfo.textContent = newName;
      jobInfo.textContent = newAbout;
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
    .then(() => {
      // Если запрос успешен, обновляем аватар на странице
      const profileImage = document.querySelector('.profile__image');
      profileImage.style.backgroundImage = `url('${avatarUrl}')`;
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
  console.log(dataCard.link);
  bigImage.src = dataCard.link;
  bigImage.alt = dataCard.name;
  bigTitle.textContent = dataCard.name;
};

// вставляем карточки из массива
getInitialCards().then(cards => {
  cards.reverse().forEach(card => {
    renderCard(card.name, card.link, card._id, card.likes, openImagePopup, deleteFunction);
  });
}).catch(error => {
  console.error('Error fetching initial cards:', error);
});


// Вызовем функцию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

