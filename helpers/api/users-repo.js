const fs = require('fs');

// users in JSON file for simplicity, store in a db for production applications
let users = require('data/users.json');

export const usersRepo = {
    getAll: () => users,
    getById: ErNo => users.find(x => x.ErNo.toString() === ErNo.toString()),
    find: x => users.find(x),
    create,
    update,
    delete: _delete
};

function create(user) {
    // generate new user id
    // user.ErNo = users.length ? Math.max(...users.map(x => x.ErNo)) : 1;
    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

function update(ErNo, params) {
    const user = users.find(x => x.ErNo.toString() === ErNo.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(ErNo) {
    // filter out deleted user and save
    users = users.filter(x => x.ErNo.toString() !== ErNo.toString());
    saveData();
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}