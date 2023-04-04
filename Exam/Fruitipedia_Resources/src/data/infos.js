import { get, post, put, del } from "./api.js";

//get points from e2e.test
const endpoints = {
    catalog: "/data/fruits?sortBy=_createdOn%20desc",
    create: "/data/fruits",
    search: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
    details: (id) => `/data/fruits/${id}`,
    delete: (id) => `/data/fruits/${id}`,
    own: (fruitId, userId) =>
        `/data/fruits?where=fruitId%3D%22${fruitId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};
// /data/fruits?where=name%20LIKE%20%22${query}%22

export async function getAllFruits() {
    return get(endpoints.catalog);
}
export async function getFruitById(id) {
    return get(endpoints.details(id));
}
export async function getMyFruits(id) {
    return get(endpoints.profile(id));
}
export async function createFruit(data) {
    return post(endpoints.create, data);
}
export async function editFruit(id, data) {
    return put(endpoints.details(id), data);
}
export async function deleteFruit(id) {
    return del(endpoints.details(id));
}
export async function searchEngine(query) {
    return get(endpoints.search(query));
}