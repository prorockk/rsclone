import * as storage from "./storage";
import sendResponse from "./network";
import { mainCounter } from "../Rooms/startGame";

let usersList: any[];
let currentUser: any;

export function login() {
    return storage.get("User") === null ? "" : storage.get("User");
}

export async function findUser(userName: string) {
    usersList = await sendResponse.get("users");

    usersList.forEach((user) => {
        if (user.name === userName) currentUser = user;
    });

    if (!currentUser) currentUser = await setUser(userName);

    console.log("currentUser:", currentUser);
    storage.set("User", userName);

    return currentUser;
}

export async function sendChangeUser() {
    console.log(mainCounter.user);

    await sendResponse.set(mainCounter.user);
}

async function setUser(userName: string) {
    return await sendResponse.create({ name: userName });
}
