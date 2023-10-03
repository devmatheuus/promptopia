'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { PromptProps } from '@interfaces/PromptCardList';

const MyProfile = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);

  const router = useRouter();

  const { data: session } = useSession();

  const handleEdit = (prompt: PromptProps) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: PromptProps) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);

        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.id}/posts`);
      const data: PromptProps[] = await response.json();

      setPrompts(data);
    };

    if (session?.id) {
      fetchPrompts();
    }
  }, [session]);

  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      prompts={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
