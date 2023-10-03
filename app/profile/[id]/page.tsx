'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { PromptProps } from '@interfaces/PromptCardList';

const SpecifProfile = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);

  const { data: session } = useSession();

  const { id } = useParams();

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data: PromptProps[] = await response.json();

      setPrompts(data);
    };

    if (id) {
      fetchPrompts();
    }
  }, [id]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <Profile
      name={prompts[0]?.creator.username as string}
      description="Check posts made by other users"
      prompts={prompts}
    />
  );
};

export default SpecifProfile;
