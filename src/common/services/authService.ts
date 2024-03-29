import {Md5} from "ts-md5";

import {IAuthCredentials} from "../../forms/RegistrationForm/formTypes";

const getHashed = (data: string) => Md5.hashStr(data);
const storeCredentials: (data: IAuthCredentials) => void =
    (data) => {
        delete data.rePassword;
        const password = getHashed(data.password);
        localStorage.setItem("movieCred", JSON.stringify({...data, password}));
    };

const getCredentials: () => IAuthCredentials =
    () => JSON.parse(localStorage.getItem("movieCred"));

const clearCredentials: () => void =
    () => localStorage.removeItem("movieCred");

const isAuthWithCredentials: (data: IAuthCredentials) => boolean =
    (data) => {
        const credentials = getCredentials();
        if (credentials) {
            const {name, password} = credentials;
            return data.name === name && Md5.hashStr(data.password) === password;
        }
        return false;
    };

export {storeCredentials, getCredentials, clearCredentials, isAuthWithCredentials};