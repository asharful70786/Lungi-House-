
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
  }
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;