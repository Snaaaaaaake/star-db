export default function getId(source) {
    const idRegExp = /\/([0-9]{1,3})\/$/;
    const id = source.match(idRegExp)[1];
    return id;
}