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

    //проверка заголовка
    _getHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    //запрос инфы о профиле
    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then((res) => {
                return this._checkResponse(res);
            });
    }

    //загрузка карточек
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then((res) => {
                return this._checkResponse(res);
            });
    }

    //изменение инфы профеля
    changeProfileInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.profileName,
                about: data.profileProfession
            })
        })
            .then((res) => {
                return this._checkResponse(res);
            });
    }

    //добавление новой карточки
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => {
                return this._checkResponse(res);
            });
    }

    //удалить карточки
    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then((res) => {
                return this._checkResponse(res);
            });
    }

    //проверить лайк
    changeLikeCardStatus(_id, isLiked) {

        if(isLiked) {
            return fetch(`${this._url}/cards/${_id}/likes`, {
                method: 'PUT',
                headers: this._getHeaders(),
            })
                .then((res) => {
                    return this._checkResponse(res);
                });
        } else {
            return fetch(`${this._url}/cards/${_id}/likes`, {
                method: 'DELETE',
                headers: this._getHeaders(),
            })
                .then((res) => {
                    return this._checkResponse(res);
                });
        }
    }

    //изменение аватара профеля
    changeProfileAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then((res) => {
                return this._checkResponse(res);
            });
    }
}

const api = new Api({
    baseUrl: 'https://api.tanja2204.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;