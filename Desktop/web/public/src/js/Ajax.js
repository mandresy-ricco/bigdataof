export class Ajax {
    constructor() {
        console.log('Class Ajax initialisé !')
    }
    get(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .catch(e => {
                console.log('Une erreur est survenue: ' + e.message);
            });
    }

    post(data,url) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .catch(e => {
                console.log('Une erreur est survenue: ' + e.message);
            });
    }
}