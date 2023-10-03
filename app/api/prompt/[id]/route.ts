import Prompt from '@models/Prompt';
import { connectToDB } from '@utils/database';

//GET

interface ParamsProps {
  params: { id: string };
}

interface RequestBody {
  prompt: string;
  tag: string;
}

export const GET = async (req: Request, { params }: ParamsProps) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById({
      _id: params.id,
    }).populate('creator');

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};

//update
export const PATCH = async (req: Request, { params }: ParamsProps) => {
  const { prompt, tag }: RequestBody = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById({
      _id: params.id,
    }).populate('creator');

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update the prompt', { status: 500 });
  }
};

//delete
export const DELETE = async (req: Request, { params }: ParamsProps) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove({
      _id: params.id,
    });

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete the prompt', { status: 500 });
  }
};
