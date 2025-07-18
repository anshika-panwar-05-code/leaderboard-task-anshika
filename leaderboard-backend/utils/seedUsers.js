const User = require('../models/User');

const seedUsers = async () => {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
        const defaultUsers = [
            { name: 'Rahul' },
            { name: 'Kamal' },
            { name: 'Sanak' },
            { name: 'Amit' },
            { name: 'Priya' },
            { name: 'Neha' },
            { name: 'Ankit' },
            { name: 'Ravi' },
            { name: 'Suman' },
            { name: 'Divya' },
        ];

        await User.insertMany(defaultUsers);
        console.log("Default 10 users created in database.");
    } else {
        console.log(`Database already has ${userCount} user(s).`);
    }
};

module.exports = seedUsers;
