import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ================= PROFILE =================
    avatar: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    goal: {
      type: String,
      default: "",
    },

    // ================= DASHBOARD STATS =================
    quizzes: [
      {
        quizName: String,
        score: Number,
        date: { type: Date, default: Date.now },
      },
    ],

    colleges: [
      {
        name: String,
        savedAt: { type: Date, default: Date.now },
      },
    ],

    skills: [
      {
        name: String,
        level: String,
      },
    ],

    achievements: [
      {
        title: String,
        date: { type: Date, default: Date.now },
      },
    ],

    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
