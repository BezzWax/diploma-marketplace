import { createContext, useContext } from 'react';
import { makeAutoObservable, action } from 'mobx';

class UserStore {
  _isAuth = false;
  _user = {};

  constructor() {
    makeAutoObservable(this, {
      setIsAuth: action,
      setUser: action,
    });
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}

const userStore = new UserStore();
const UserStoreContext = createContext(userStore);

export { UserStoreContext, userStore };