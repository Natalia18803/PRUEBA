import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.connect('mongodb://localhost:27017/numerologia')
    .then(async () => {
        const hashedPassword = await bcrypt.hash('999999999', 10);
        await mongoose.connection.db.collection('usuarios').updateOne(
            { email: 'admin@admin.com' },
            { $set: { password: hashedPassword, rol: 'admin' } }
        );
        console.log("Password updated successfully");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
