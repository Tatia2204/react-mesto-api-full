class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    //проверка ответа
    _handleRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
    }

    //проверка заголовков
    _getHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    //запрос инфы о профиле
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        }).then((res) => {
            return this._handleRes(res);
        });
    }

    //загрузка карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getHeaders(),
        }).then((res) => {
            return this._handleRes(res);
        });
    }

    //изменение инфы профеля
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.profileName,
                about: data.profileProfession,
            }),
        }).then((res) => {
            return this._handleRes(res);
        });
    }

    //добавление новой карточки
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then((res) => {
            return this._handleRes(res);
        });
    }

    //удалить карточки
    removeCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        }).then((res) => {
            return this._handleRes(res);
        });
    }

    //проверить лайк
    addCardLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
        }).then((res) => {
            return this._handleRes(res);
        });
    }

    deleteCardLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        }).then((res) => {
            return this._handleRes(res);
        });
    }

    //изменение аватара профеля
    updateProfileAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then((res) => {
            return this._handleRes(res);
        });
    }
}

const api = new Api({
    baseUrl: 'https://api.tanja2204.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;