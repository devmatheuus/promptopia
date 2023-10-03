import { Schema, Document, model, models, Model } from 'mongoose';

interface PromptDocument extends Document {
  creator: typeof Schema.Types.ObjectId;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<PromptDocument>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const Prompt: Model<PromptDocument> =
  models?.Prompt || model('Prompt', PromptSchema);

export default Prompt;
