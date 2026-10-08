import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  course: {
    type: String,
    required: true,
    enum: ["BCA", "BSc CSIT", "BIT", "BBA",]
  },
  Teacher: {
    type: String,
    required: true,
    enum: [
      "Rajesh Sharma",
      "Suman Adhikari",
      "Prakash Thapa",
      "Anita Karki",
      "Bikash Shrestha",
      "Nisha Gurung",
      "kshitiz shrestha",
      "shissir shressstha",
    ]
  }


});

export default mongoose.model("Users", userSchema);
