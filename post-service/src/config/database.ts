import mongoose from 'mongoose';
connectDB().catch(err => console.log(err));

export async function connectDB(): Promise<void> {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}
