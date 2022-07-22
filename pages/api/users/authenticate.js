const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';

import { apiHandler, usersRepo } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: authenticate
});

function authenticate(req, res) {
    const { ErNo, password } = req.body;
    const user = usersRepo.find(u => u.ErNo === ErNo);

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'ErNo or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.ErNo }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // return basic user details and token
    return res.status(200).json({
        ErNo: user.ErNo,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        accounts : user.accounts,
        token
    });
}
