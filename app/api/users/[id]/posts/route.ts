import Prompt from '@models/Prompt';
import { connectToDB } from '@utils/database';

interface ParamsProps {
  params: { id: string };
}

export const GET = async (req: Request, { params }: ParamsProps) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
