import { Dispatch, SetStateAction, useEffect } from "react";

import { Writer } from "../types/common";
import getStringEntity from "../utils/getStringEntity";

type UseFindWriters = {
  search: string;
  nationality: string;
  list: Writer[];
  setter: Dispatch<SetStateAction<Writer[]>>;
};

const useFindWriters = ({
  search,
  nationality,
  list,
  setter,
}: UseFindWriters) => {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!search && !nationality) {
        setter(list);
      } else {
        const filteredList = list.filter((writer) => {
          let isValid = true;

          if (search) {
            isValid = getStringEntity(writer).includes(search.toLowerCase());
          }
          if (nationality && isValid) {
            isValid = writer.nationality?.toLowerCase() === nationality;
          }

          return isValid;
        });
        setter(filteredList);
      }
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [search, nationality, list, setter]);
};

export default useFindWriters;
