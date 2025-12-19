
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Check if model exists to avoid recompilation error in some envs
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema, 'admin');

async function seed() {
    try {
        if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'prasath1196@gmail.com';
        const password = 'Iamthehalfbloodprince@1996';

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await Admin.findOneAndUpdate(
            { email },
            { email, password: hashedPassword },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log(`Admin user seeded successfully: ${result.email}`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seed();
