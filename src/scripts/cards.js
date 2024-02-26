import {cardsConteiner, cardTemplate} from '../constants/constants';

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


const config = {
  selectorList: '.places__item',
  selectorTemplate: '#card-template',
  cardImgSelector: '.card__image',
  cardTitleSelector: '.card__title',
  cardDeleteBtnSelector: '.card__delete-button',
  toggleLikeSelector: '.card__like-button',
  activeLikeBtnClass: 'card__like-button_active'
}

// class Card {
//   constructor(name, link, config) {
//     this._name = name;
//     this._link = link;
//     this._config = config

//   }


//   //Добавление своей карточки
//   _getTemplate() {
  
//     const newCard = document
//       .querySelector(this._config.selectorTemplate)
//       .content
//       .querySelector('.places__item')
//       .cloneNode(true);

//     return newCard;
//   }

  

//   //удалениe карточки 
//   _deleteCard(deleteCard) {
//     //  this._element.remove()
//     deleteCard.closest(this._config.selectorList).remove()
//   }

//   //добавление лайка
//   _toggleLike(elementsLike) {
//     elementsLike.classList.toggle(this._config.activeLikeBtnClass)
//   }

//   // слушатели на добавление лайка, удаление карточки и открытие фото
//   _setEventListeners() {
//     const deleteCard = this._element.querySelector(this._config.cardDeleteBtnSelector);
//     const elementsLike = this._element.querySelector(this._config.toggleLikeSelector);

//     deleteCard.addEventListener('click', () => {
//       this._deleteCard(deleteCard)
//     })

//     this._cardImage.addEventListener('click', () => {
//       openImagePopup(this._cardImage, this._name);
//     })

//     elementsLike.addEventListener('click', () => {
//       this._toggleLike(elementsLike);
//     })
//   }

//   //Добавление своей карточки
//   createNewCard() {
//     this._element = this._getTemplate();
//     this._cardImage = this._element.querySelector(this._config.cardImgSelector);

//     this._cardImage.src = this._link;
//     this._cardImage.alt = ` ${this._link}.`;
//     this._element.querySelector(this._config.cardTitleSelector).textContent = this._name;

//     this._setEventListeners();

//     return this._element;
//   }



// };

// export { Card, config, initialCards }



const createNewCard = (name, link) => {
  console.log(cardTemplate);
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
  return newCard;
};

const renderCard = (name, link) => {
  cardsConteiner.append(createNewCard(name, link));
};


export { config, initialCards, createNewCard, renderCard }