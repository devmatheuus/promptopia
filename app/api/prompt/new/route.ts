import Prompt from '@models/Prompt';
import { connectToDB } from '@utils/database';

interface BodyProps {
  prompt: string;
  tag: string;
  userId: string;
}

export const POST = async (req: Request) => {
  const { prompt, tag, userId }: BodyProps = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
