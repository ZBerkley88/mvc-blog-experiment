// taking the Model and DataTypes (so we know the data type is a string/integer) object sequelize gives out; destructuring
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {
  // extra methods will go here
}

Post.init(
  // first argument: data required to create a post
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_body: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  // second argument: object that contains options for how we interact with the database
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
