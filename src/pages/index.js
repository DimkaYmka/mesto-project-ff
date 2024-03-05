import '../pages/index.css';
import { initialCards, createNewCard, renderCard, deleteFunction, likeFunction } from '../scripts/card.js';
import { openPopup, closePopup } from '../scripts/modal.js'
import {
  openCardButton, openProfileButtton, inputInfo,
  inputName, nameInfo, jobInfo, popupProfile, cardPopup,
  profileForm, bigPopup, bigImage, bigTitle, placeNameInput, placeUrlInput,
  popupAddCardForm, cardsConteiner, forms
} from "../constants/elements.js";
import { getUserData, getInitialCards, updateProfile, postCard } from '../scripts/api.js';

//получение пользовательских данных API
getUserData().then(userData => {
  nameInfo.textContent = userData.name;
  jobInfo.textContent = userData.about;
});

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
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
    });
}


// // слушатель формы
forms.forEach((formElement) => {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  })

})

//Слушатель на открытие для профиля
openProfileButtton.addEventListener('click', () => {
  inputName.value = nameInfo.textContent;
  inputInfo.value = jobInfo.textContent;
  openPopup(popupProfile)
});

//Слушатель на сабмит для профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

//Слушатель на открытие добавления карточек
openCardButton.addEventListener('click', () => {
  openPopup(cardPopup)
});

//сабмит для профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newName = inputName.value;
  const newAbout = inputInfo.value;
  updateProfile(newName, newAbout);
  nameInfo.textContent = newName;
  jobInfo.textContent = newAbout;
  closePopup(popupProfile);

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

////////////////////////////////////////////////////////



const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};
const hasInvalidInput = (inputList) => {
return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

const toggleButtonState = (inputList, buttonElement) => {
if(hasInvalidInput(inputList)) {
   buttonElement.classList.add('button_inactive');
} else {
    buttonElement.classList.remove('button_inactive');
}
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button')
   toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
       toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset);
    });

  });
};

// Вызовем функцию
enableValidation(); 
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }); 

