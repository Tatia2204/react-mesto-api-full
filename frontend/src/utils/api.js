class Api {
    constructor(options) {
        this._url = options.baseUrl;
        // this._headers = options.headers;
    }

    //загрузка карточек
    getInitialCards(jwt) {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(this._checkResponse);
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
            .then(this._checkResponse);
    }

    //проверка ответа
    _checkResponse(res) {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }

    //запрос инфы о профиле
    getProfileInfo(jwt) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(this._checkResponse);
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
            .then(this._checkResponse);
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
            .then(this._checkResponse);
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
                .then(this._checkResponse);
    }
    //удалить карточки
    deleteCard(cardId, jwt) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://api.tanja2204.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export default api;