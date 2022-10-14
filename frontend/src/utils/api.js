import { checkResponse, BASE_URL } from './constant';

class Api {
    constructor(options) {
        this._url = options.baseUrl;
    }

    //загрузка карточек
    getInitialCards(jwt) {
        return fetch(`${this._url}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then((res) => checkResponse(res));
    }

    //добавление новой карточки
    addNewCard(data, jwt) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => checkResponse(res));
    }

    //запрос инфы о профиле
    getProfileInfo(jwt) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then((res) => checkResponse(res));
    }

    //изменение инфы профеля
    changeProfileInfo(data, jwt) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: data.profileName,
                about: data.profileProfession
            })
        })
            .then((res) => checkResponse(res));
    }

    //изменение аватара профеля
    changeProfileAvatar(data, jwt) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then((res) => checkResponse(res));
    }

    //проверить лайк
    changeLikeCardStatus(cardId, isLiked, jwt) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then((res) => checkResponse(res));
    }

    //удалить карточки
    deleteCard(cardId, jwt) {
        console.log('deleteCard' cardId);
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then((res) => checkResponse(res));
    }
}


const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export default api;