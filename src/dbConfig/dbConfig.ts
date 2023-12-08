import mongoose from "mongoose";
export async function connect() {
  try {
    console.log("process.env.MONGO_URI!:", process.env.MONGO_URI!);
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("error", (err:any) => {
      console.log("mongo connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("error:", error);
  }
}
