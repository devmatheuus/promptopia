import React from 'react';
import { PostProps } from './Post';

export interface FormProps {
  type: 'Create' | 'Edit';
  post: PostProps;
  setPost: React.Dispatch<React.SetStateAction<PostProps>>;
  submitting: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
