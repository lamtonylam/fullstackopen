import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

// getting all the persons
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

// creating new person
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

// updating the person
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

// deleting the person
const http_delete = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

export default {
    getAll,
    create,
    update,
    http_delete
};
