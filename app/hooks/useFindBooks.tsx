import { Dispatch, SetStateAction, useEffect } from "react";

import { Book, Writer } from "../types/common";
import getStringEntity from "../utils/getStringEntity";

type UseFindBooks = {
  search: string;
  nationality: string;
  clickedAuthorId?: number;
  list: Book[];
  setter: Dispatch<SetStateAction<Book[]>>;
};

const useFindBooks = ({
  search,
  nationality,
  clickedAuthorId,
  list,
  setter,
}: UseFindBooks) => {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!search && !nationality && !clickedAuthorId) {
        setter(list);
      } else {
        const filteredList = list.filter((book) => {
          let isValid = true;

          if (search) {
            isValid = getStringEntity({
              id: book.id,
              title: book.title,
              author_name: book.author_name,
              year: book.year,
            }).includes(search.toLowerCase());
          }
          if (nationality && isValid) {
            isValid = book.author_nationality === nationality;
          }
          if (clickedAuthorId && isValid) {
            isValid = book.author_id === clickedAuthorId;
          }

          return isValid;
        });
        setter(filteredList);
      }
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [clickedAuthorId, list, nationality, search, setter]);
};

export default useFindBooks;
