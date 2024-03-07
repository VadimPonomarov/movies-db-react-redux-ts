import {Md5} from "ts-md5";

import {IAuthCredentials} from "../../forms/MyRegistrationForm/formTypes";

const getHashed = (data: string) => Md5.hashStr(data);
const storeCredentials = (data: IAuthCredentials) => {
    delete data.rePassword;
    const password = getHashed(data.password);
    localStorage.setItem("movieCred", JSON.stringify({...data, password}));
};

const getCredentials = (): IAuthCredentials => {
    return JSON.parse(localStorage.getItem("movieCred"));
};

const clearCredentials = (): void => {
    localStorage.removeItem("movieCred");
};

const isAuthWithCredentials = (data: IAuthCredentials): boolean => {
    const credentials = getCredentials();
    if (credentials) {
        const {name, password} = credentials;
        return data.name === name && Md5.hashStr(data.password) === password;
    }
    return false;

};

export {storeCredentials, getCredentials, clearCredentials, isAuthWithCredentials};