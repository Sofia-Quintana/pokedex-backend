const db = require('../helpers/db');

module.exports = {
    getById,
    create,
    update
};

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { nickname: params.nickname } })) {
        throw 'Nickname "' + params.nickname + '" is already registered';
    }

    const user = new db.User(params);

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const nicknameChanged = params.nickname && user.nickname !== params.nickname;
    if (nicknameChanged && await db.User.findOne({ where: { nickname: params.nickname } })) {
        throw 'Nickname "' + params.nickname + '" is already registered';
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}