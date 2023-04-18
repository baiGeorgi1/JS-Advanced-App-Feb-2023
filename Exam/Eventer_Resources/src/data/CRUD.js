import { del, get, post, put } from "./api.js";
import { clearUserData, setUserData } from "./utils.js";

const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/events?sortBy=_createdOn%20desc",
    create: "/data/events",
    going: "/data/going",
    details: (id) => `/data/events/${id}`,
    delete: (id) => `/data/events/${id}`,
    total: (eventId) =>
        `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    own: (eventId, userId) =>
        `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

// ___________Authorization___________

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    setUserData(result);
}
export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
    setUserData(result);
}
export async function logout() {
    get(endpoints.logout);
    clearUserData();
}
// ____________ GET INFO _____________

export async function getAllEvents() {
    return get(endpoints.catalog);
}
export async function getEventById(id) {
    return get(endpoints.details(id));
}
export async function editEvent(id, data) {
    return put(endpoints.details(id), data);
}

export async function createEvent(data) {
    return post(endpoints.create, data);
}
export async function deleteEvent(id) {
    return del(endpoints.delete(id));
}
// _____ BONUS ___________
export async function willGoing(eventId) {
    return post(endpoints.going, { eventId });
}
export async function getCounts(eventId) {
    return get(endpoints.total(eventId));
}
export async function getUserCounts(eventId, userId) {
    return get(endpoints.own(eventId, userId));
}
