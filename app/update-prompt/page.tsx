'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { PostProps } from '@interfaces/Post';

const EditPrompt: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostProps>({} as PostProps);

  const router = useRouter();
  const useParams = useSearchParams();

  const promptId = useParams.get('id');

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data: PostProps = await response.json();
      setPost(data);
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...post }),
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
      handleSubmit={updatePrompt}
      post={post}
      setPost={setPost}
      submitting={submitting}
      type="Edit"
    />
  );
};

export default EditPrompt;
