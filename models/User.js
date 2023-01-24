// taking the Model and DataTypes (so we know the data type is a string/integer) object sequelize gives out; destructuring
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(passwordAttempt) {
    return bcrypt.compareSync(passwordAttempt, this.password);
  }
}

User.init(
  // first argument: data required to create a user
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  // second argument: object that contains options for how we interact with the database
  {
    hooks: {
      beforeCreate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 11);
        return userData;
      },
      beforeUpdate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 11);
        return userData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
