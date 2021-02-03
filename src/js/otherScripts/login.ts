import * as storage from "./storage";
import sendResponse from "./network";
import { mainCounter } from "../Rooms/startGame";

let usersList: any[];
let currentUser: any;

export function login() {
    return storage.get("User") === null ? "" : storage.get("User");
}

export async function findUser(userName: string): Promise<any> {
    usersList = await sendResponse.get("users");

    usersList.forEach((user) => {
        if (user.name === userName) currentUser = user;
    });

    if (!currentUser) currentUser = await setUser(userName);

    storage.set("User", userName);

    return currentUser;
}

export async function sendChangeUser(): Promise<void> {
    await sendResponse.set(mainCounter.user);
}

async function setUser(userName: string): Promise<any> {
    return await sendResponse.create({ name: userName });
}
