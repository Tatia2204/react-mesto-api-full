class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    //загрузка карточек
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
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
            .then(this._checkResponse);
    }

    //проверка ответа
    _checkResponse(res) {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        //запрос заголовка для корс
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
            .then(this._checkResponse);
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
            .then(this._checkResponse);
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
            .then(this._checkResponse);
    }

    //проверить лайк
    changeLikeCardStatus(_id, isLiked) {
        if(isLiked) {
            return fetch(`${this._url}/cards/${_id}/likes`, {
                method: 'PUT',
                headers: this._getHeaders(),
            })
                .then(this._checkResponse);
        } else {
            return fetch(`${this._url}/cards/${_id}/likes`, {
                method: 'DELETE',
                headers: this._getHeaders(),
            })
                .then(this._checkResponse);
        }
    }

    //удалить карточки
    deleteCard(data) {
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://api.tanja2204.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;