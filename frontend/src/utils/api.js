class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
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
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then((res) => this._checkResponse(res));
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
            .then((res) => this._checkResponse(res));
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
            .then((res) => this._checkResponse(res));
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
            .then((res) => this._checkResponse(res));
    }

    //удалить карточки
    deleteCard(_id, jwt) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then((res) => this._checkResponse(res));
    }

    //проверить лайк
    changeLikeCardStatus(_id, isLiked, jwt) {

        if(isLiked) {
            return fetch(`${this._url}/cards/${_id}/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                }
            })
                .then((res) => this._checkResponse(res));
        } else {
            return fetch(`${this._url}/cards/${_id}/likes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                }
            })
                .then((res) => this._checkResponse(res));
        }
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
            .then((res) => this._checkResponse(res));
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