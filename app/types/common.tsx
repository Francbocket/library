export type Writer = {
  id: number;
  first_name: string;
  last_name: string;
  nationality: string;
  number_of_books: number;
  full_name?: string;
};

export type Book = {
  id: number;
  author_id: number;
  title: string;
  year: number;
  author_name?: string;
  author_nationality?: string;
};
