import React from 'react';
import { PromptProps } from './PromptCardList';

export interface PromptCardProps {
  prompt: PromptProps;
  handleTagClick?: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    tag: string
  ) => void;
  handleEdit?: (prompt: PromptProps) => void;
  handleDelete?: (prompt: PromptProps) => void;
}
