export const checkResponse = (res) => {
    return res.ok
        ? res.json()
        : Promise.reject(
            new Error(`Ошибка ${res.status}: ${res.statusText}`)
        );
};
export const BASE_URL = 'https://api.tanja2204.nomoredomains.icu';