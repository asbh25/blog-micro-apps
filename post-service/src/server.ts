import { connectDB } from './config/database';

async function bootstrap() {
  await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
}

bootstrap()
