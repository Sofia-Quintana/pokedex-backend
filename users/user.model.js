const { DataTypes } = require('sequelize');

const model = (sequelize) => {
    const attributes = {
        nickname: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        email:    { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        fullname: { type: DataTypes.STRING, allowNull: false },
        region:   { type: DataTypes.STRING, allowNull: false },
        gender:   { type: DataTypes.STRING, allowNull: false },
        class:    { type: DataTypes.STRING, allowNull: false },
        age:      { type: DataTypes.INTEGER, allowNull: false },
        isLogged: { type: DataTypes.BOOLEAN, defaultValue: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: {}
        }
    };

    return sequelize.define('User', attributes, options);
};

module.exports = model;

