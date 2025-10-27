export interface Book {
  id: number;
  title: string;
  year: number | null;
  authorId: number;
}

export let books: Book[] = [];
let nextBookId = 1;

export const addBook = (title: string, authorId: number, year?: number): Book => {
  const book: Book = { id: nextBookId++, title, authorId, year: year ?? null };
  books.push(book);
  return book;
};

export const getBookById = (id: number): Book | undefined => books.find((b) => b.id === id);

export const updateBook = (id: number, data: Partial<Book>): Book | null => {
  const book = getBookById(id);
  if (!book) return null;
  Object.assign(book, data);
  return book;
};

export const deleteBook = (id: number): boolean => {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};

export const getBooksByAuthor = (authorId: number): Book[] => books.filter((b) => b.authorId === authorId);
