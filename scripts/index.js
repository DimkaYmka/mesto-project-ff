const cardsConteiner = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

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

// вставляем карточки из массива
initialCards.forEach((element) => {
    renderCard(element.name, element.link);
});

