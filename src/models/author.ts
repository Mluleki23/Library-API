export interface Author {
  id: number;
  name: string;
  birthYear: number | null;
}

export let authors: Author[] = [];
let nextId = 1;

export const addAuthor = (name: string, birthYear?: number): Author => {
  const author: Author = { id: nextId++, name, birthYear: birthYear ?? null };
  authors.push(author);
  return author;
};

export const getAuthorById = (id: number): Author | undefined =>
  authors.find((a) => a.id === id);

export const updateAuthor = (
  id: number,
  data: Partial<Author>
): Author | null => {
  const author = getAuthorById(id);
  if (!author) return null;
  Object.assign(author, data);
  return author;
};

export const deleteAuthor = (id: number): boolean => {
  const index = authors.findIndex((a) => a.id === id);
  if (index === -1) return false;
  authors.splice(index, 1);
  return true;
};
