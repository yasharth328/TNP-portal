import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.window && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  getAccounts,
  delete: _delete,
};

function login(ErNo, password) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { ErNo, password })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function getAccounts(ErNo) {
  return fetchWrapper.post(`${baseUrl}/${ErNo}`);
}
function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/account/login");
}

function register(user) {
  if (user.ErNo == 735560) {
    user.role = "admin";
  } else {
    user.role = "student";
    user.accounts = [];
  }
  return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(ErNo) {
  return fetchWrapper.get(`${baseUrl}/${ErNo}`);
}

function update(ErNo, params) {
  return fetchWrapper.put(`${baseUrl}/${ErNo}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (ErNo === userSubject.value.ErNo) {
      // update local storage
      const user = { ...userSubject.value, ...params };
      localStorage.setItem("user", JSON.stringify(user));
      // publish updated user to subscribers
      userSubject.next(user);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(ErNo) {
  return fetchWrapper.delete(`${baseUrl}/${ErNo}`);
}
