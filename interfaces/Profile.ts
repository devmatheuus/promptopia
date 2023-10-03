import { PromptProps } from './PromptCardList';

export interface ProfileProps {
  name: string;
  description: string;
  prompts: PromptProps[];
  handleEdit?: (prompt: PromptProps) => void;
  handleDelete?: (prompt: PromptProps) => void;
}
