import { useMemo, useRef } from "react";
import isDeepEqual from "fast-deep-equal/react";
import useSWR from "swr";

import { Book, Writer } from "../types/common";
import fetcher from "../utils/fetcher";

type UseFetchBooksDataProps = {
  writersById: Record<string, Partial<Writer>>;
};

const useFetchBooksData = ({ writersById }: UseFetchBooksDataProps) => {
  const { data = [], error, isLoading } = useSWR<Book[]>("/api/books", fetcher);
  const writersByIdRef = useRef(writersById);

  if (!isDeepEqual(writersByIdRef.current, writersById)) {
    writersByIdRef.current = writersById;
  }

  const booksListExtended = useMemo(
    () =>
      data.map((book) => ({
        ...book,
        author_name: writersById[book.author_id]?.full_name,
        author_nationality: writersById[book.author_id]?.nationality,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, writersByIdRef.current]
  );

  return {
    booksData: booksListExtended,
    errorBooks: error,
    isLoadingBooks: isLoading,
  };
};

export default useFetchBooksData;
