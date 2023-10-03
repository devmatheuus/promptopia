'use client';

import React, { useEffect, useRef, useState } from 'react';
import PromptCardList from './PromptCardList';
import { PromptProps } from '@interfaces/PromptCardList';

const Feed: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const originalPrompts = useRef<PromptProps[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const updatedSearchText = event.target.value;
    setSearchText(updatedSearchText);

    if (!updatedSearchText.length) {
      setPrompts(originalPrompts.current);
      return;
    }

    const filteredPrompts = prompts.filter((prompt) => {
      return (
        prompt.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        prompt.creator.username.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    if (filteredPrompts.length) {
      setPrompts(filteredPrompts);
    } else {
      setPrompts(originalPrompts.current);
    }
  };

  const handleTagClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    tag: string
  ) => {
    e.stopPropagation();

    setSearchText(tag);

    const filteredPrompts = prompts.filter((prompt) => {
      return prompt.tag.toLowerCase().includes(tag.toLowerCase());
    });

    if (filteredPrompts) {
      setPrompts(filteredPrompts);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data: PromptProps[] = await response.json();

      setPrompts(data);
      originalPrompts.current = data;
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
