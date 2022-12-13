import {User} from "../types/user";

export const isAdmin = (user: User) => {
    return user.authorities.includes("ROLE_ADMIN");
}

export const getProfileIconName = (user: User) => {
    return isAdmin(user) ? "/pictures/user-icon-admin.png" : "/pictures/user-icon.png";
}

export interface Page {
    name: string,
    navigate: string
}

const homePage: Page = {name: "Home", navigate: "/home"}
const formPage: Page = {name: "Form", navigate: "/form"}

const anonymousUserNavPages = [homePage];
const loggedInUserNavPages = [homePage, formPage];

export const getUserNavPages = (user: User) => {
    return user.isLoggedIn ? loggedInUserNavPages : anonymousUserNavPages;
}

const loginPage: Page = {name: "Login", navigate: "/login"}
const registerPage: Page = {name: "Register", navigate: "/register"}
const logoutPage: Page = {name: "Logout", navigate: "/logout"}

const anonymousUserUserPages = [loginPage, registerPage];
const loggedInUserUserPages = [logoutPage];

export const getUserUserPages = (user: User) => {
    return user.isLoggedIn ? [{name: user.username, navigate: "/profile"}, ...loggedInUserUserPages] : anonymousUserUserPages;
}