export interface PromptProps {
  _id: string;
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
    __v: number;
  };
  prompt: string;
  tag: string;
  _v: string;
}

export interface PromptCardListProps {
  data: PromptProps[];
  handleTagClick: (e: any, tag: string) => void;
}
