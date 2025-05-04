import mongoose from 'mongoose';

async function ConnectDb() {
  await mongoose.connect(process.env.mongodb_Url);
  console.log("Database connected Sucessfully");
}

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

export default ConnectDb;