import { Schema, model, models, Document, Model } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  username: string;
  image: string;
}

const UsersSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  },
});

const User: Model<UserDocument> =
  models.User || model<UserDocument>('User', UsersSchema);

export default User;
