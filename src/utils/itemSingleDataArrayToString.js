export default function itemSingleDataArrayToString(array) {
    return `${array[0]}: ${array[1]} ${ array[2] ? '(' + array[2] + ')' : '' }`;
}