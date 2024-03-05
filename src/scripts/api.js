const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581',
    'Content-Type': 'application/json'
  }
}

export const getUserData = () => {
  return fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581'
    }
  })
    .then(res => res.json());
}

export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581'
    }
  })
    .then(res => res.json());
}


export const updateProfile = (name, about) => {
  return fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => res.json());
};

export const postCard = (name, link) => {
  return fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
    method: 'POST',
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => res.json());
};

export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/cohort-magistr-2/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
};

export const addLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/cohort-magistr-2/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
};

export const deleteLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/cohort-magistr-2/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
};

export const updateAvatar = (avatarUrl) => {
  return fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '4968ccd2-3516-4ddc-a6b3-c5c111c52581',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar : avatarUrl
    })
  })
  .then(res => res.json());
};

