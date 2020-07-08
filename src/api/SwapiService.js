import {
    transformPlanet,
    transformPerson,
    transformPaginationData,
    transformStarship,
} from '../utils/transformIncomigData';

export default class SwapiService {
    constructor(dataApiUrl, imgApiUrl) {
        this._dataApiUrl = dataApiUrl;
        this._imgApiUrl = imgApiUrl;
        this.planet = {
            getImageMethod: this.getPlanetPhoto,
            getItemMethod: this.getPlanet,
            getListMethod: this.getAllPlanets,
        }
        this.person = {
            getImageMethod: this.getPersonPhoto,
            getItemMethod: this.getPerson,
            getListMethod: this.getAllPersons,
        }
        this.starship = {
            getImageMethod: this.getStarshipPhoto,
            getItemMethod: this.getStarship,
            getListMethod: this.getAllStarship,
        }
    }

    async _getResource (url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error (res.status);
        }
        return await res.json();
    }

    async _getImage (url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error (res.status);
        }
        return await res.blob();
    }

    getPerson = (id, miniFetch) => {
        return this._getResource(`${this._dataApiUrl}/people/${id}`)
            .then(item => transformPerson(item, miniFetch));
    }
    getAllPersons = (page) => {
        return this._getResource(`${this._dataApiUrl}/people/` + (page ? `?page=${page}` : ``) )
            .then(data => {
                data.results = data.results.map(item => transformPerson(item));
                data = transformPaginationData(data, page);
                return data;
            });
    }
    getAllPersonsMini() {
        return this._getResource(`${this._dataApiUrl}/people/`)
            .then(data => data.results.map(item => transformPerson(item)));
    }
    getPersonPhoto = (id) => {
        return this._getImage(`${this._imgApiUrl}/characters/${id}.jpg`);
    }

    getPlanet = (id, miniFetch) => {
        return this._getResource(`${this._dataApiUrl}/planets/${id}`)
            .then(item => transformPlanet(item, miniFetch));
    }
    getAllPlanets = (page) => {
        return this._getResource(`${this._dataApiUrl}/planets/` + (page ? `?page=${page}` : ``) )
            .then(data => {
                data.results = data.results.map(item => transformPlanet(item));
                data = transformPaginationData(data, page);
                return data;
            });
    }
    getPlanetPhoto = (id) => {
        return this._getImage(`${this._imgApiUrl}/planets/${id}.jpg`);
    }

    getStarship = (id, miniFetch) => {
        return this._getResource(`${this._dataApiUrl}/starships/${id}`)
            .then(item => transformStarship(item, miniFetch));
    }
    getAllStarship = (page) => {
        return this._getResource(`${this._dataApiUrl}/starships/` + (page ? `?page=${page}` : ``) )
            .then(data => {
                data.results = data.results.map(item => transformStarship(item));
                data = transformPaginationData(data, page);
                return data;
            });
    }
    getStarshipPhoto = (id) => {
        return this._getImage(`${this._imgApiUrl}/starships/${id}.jpg`);
    }
}