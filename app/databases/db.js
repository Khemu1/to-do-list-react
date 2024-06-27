import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/to-do");
    console.log("Database connection established");
  } catch (error) {
    console.log("Database connection error ", error);
  }
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const listSchema = new mongoose.Schema({
  listId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
const List = mongoose.model("List", listSchema);

export { connectDB, User, List };
