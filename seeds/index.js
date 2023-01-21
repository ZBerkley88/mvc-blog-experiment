const sequelize = require('../config/connection');
const seedReviews = require('./review-seeds');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedReviews();

    process.exit(0);
} 

seedDatabase();