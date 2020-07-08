import getId from './getId';
import loadingIcon from '../images/loading-icon.gif';
import entityTypes from '../constants/entityTypes';

function translateUnknown(text) {
    return text === 'unknown' ? 'неизвестно' : text;
}

export function transformPlanet(data, miniFetch){
    const id = getId(data.url);
    const updatedItem = {
        id,
        name: data.name,
        img: loadingIcon,
        data: {
            population: ['Население', data.population],
            rotation: ['Период вращения', data.rotation_period, 'в сутках'],
            diameter: ['Диаметр', data.diameter, 'в километрах'],
        },
    }

    if (miniFetch) {
        return updatedItem;
    }

    if (data.residents.length > 0) {
        updatedItem.relations = [{
            name: 'Резиденты',
            loading: true,
            type: entityTypes.person,
            data: data.residents.map(item => getId(item)),
        }];
    }

    return updatedItem;
}

export function transformPerson(data, miniFetch){
    const id = getId(data.url);
    const birth = translateUnknown(data.birth_year);
    const mass = translateUnknown(data.mass)
    let gender;
    switch (data.gender) {
        case 'female':
            gender = 'женский';
            break;
        case 'male':
            gender = 'мужской';
            break;
        default:
            gender = 'недоступно';
    }
    
    const updatedItem = {
        id,
        name: data.name,
        img: loadingIcon,
        data: {
            height: ['Рост', data.height, 'в сантиметрах'],
            gender: ['Пол', gender],
            birth: ['Дата рождения', birth],
            mass: ['Вес', mass, 'в килограммах'],
        },
        relations: [],
    }

    if (miniFetch) {
        return updatedItem;
    }

    if (data.starships.length > 0) {
        updatedItem.relations.push({
            name: 'Пилот',
            loading: true,
            type: entityTypes.starship,
            data: data.starships.map(item => getId(item)),
        });
    }
    if (data.homeworld.length > 0) {
        updatedItem.relations.push({
            name: 'Родная планета',
            loading: true,
            type: entityTypes.planet,
            data: [ getId(data.homeworld) ],
        });
    }
    return updatedItem;
}

export function transformStarship(data, miniFetch){
    const id = getId(data.url);
    const cost = translateUnknown(data.cost_in_credits);
    const updatedItem =  {
        id,
        name: data.name,
        img: loadingIcon,
        data: {
            cost: ['Cтоимость', cost, 'в кредитах'],
            manufacturer: ['Производитель', data.manufacturer],
            crew: ['Экипаж', data.crew],
            length: ['Длинна', data.length, 'в метрах'],
            passengers: ['Вместимость пассажиров', data.passengers],
        }
    }

    if (miniFetch) {
        return updatedItem;
    }

    if (data.pilots.length > 0) {
        updatedItem.relations = [{
            name: 'Пилоты',
            loading: true,
            type: entityTypes.person,
            data: data.pilots.map(item => getId(item)),
        }];
    }
    return updatedItem;
}

export function transformPaginationData(data, page){
    const currentPage = +page || 1;
    return {
        pages: {
            currentPage,
            countPages: data.count,
        },
        results: data.results,
    }
}