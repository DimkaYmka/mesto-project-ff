const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('.popup__form');

const popupAddCardForm = document.forms['new-place'];
const popupAvatar = document.forms['place-avatar'];

const cardsConteiner = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

const openCardButton = document.querySelector('.profile__add-button')
const openProfileButtton = document.querySelector('.profile__edit-button');
const openAvatarButtton = document.querySelector('.profile__image');

const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_description');


const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');

const profileForm = document.querySelector('.popup');

const placeNameInput = document.getElementById("place-name");
const placeUrlInput = document.getElementById("link");



const bigImage = document.querySelector('.popup__image');
const bigTitle = document.querySelector('.popup__caption');

const bigPopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.card__image');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


export {
  popups, forms, cardsConteiner,
  cardTemplate, openCardButton, openProfileButtton,
  inputName, inputInfo, nameInfo, jobInfo,
  popupProfile, profileForm, placeNameInput, placeUrlInput, cardPopup,
 bigPopup, bigImage, bigTitle, popupImage, popupAddCardForm, 
 openAvatarButtton, avatarPopup, popupAvatar, config
}