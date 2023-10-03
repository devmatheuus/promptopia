'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { PostProps } from '@interfaces/Post';

const CreatePrompt: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostProps>({} as PostProps);

  const { data: session } = useSession();

  const router = useRouter();

  const createPrompt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({ ...post, userId: session?.id }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      handleSubmit={createPrompt}
      post={post}
      setPost={setPost}
      submitting={submitting}
      type="Create"
    />
  );
};

export default CreatePrompt;
