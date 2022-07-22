const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { usersRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

function getById(req, res) {
    const user = usersRepo.getById(req.query.ErNo);

    if (!user) throw 'User Not Found';

    return res.status(200).json(omit(user, 'hash'));
}

function update(req, res) {
    const user = usersRepo.getById(req.query.ErNo);

    if (!user) throw 'User Not Found';

    // split out password from user details 
    const { password, ...params } = req.body;

    // validate
    if (user.ErNo !== params.ErNo && usersRepo.find(x => x.ErNo === params.ErNo))
        throw `User with the ErNo "${params.ErNo}" already exists`;

    // only update hashed password if entered
    if (password) {
        user.hash = bcrypt.hashSync(password, 10);
    }

    usersRepo.update(req.query.ErNo, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    usersRepo.delete(req.query.ErNo);
    return res.status(200).json({});
}
