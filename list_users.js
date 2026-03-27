import mongoose from 'mongoose';
import fs from 'fs';

mongoose.connect('mongodb://localhost:27017/numerologia')
    .then(async () => {
        const users = await mongoose.connection.db.collection('usuarios').find({}).toArray();
        fs.writeFileSync('users_output.json', JSON.stringify(users, null, 2));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
