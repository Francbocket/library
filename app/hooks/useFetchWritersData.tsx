import useSWR from "swr";

import { Writer } from "../types/common";
import fetcher from "../utils/fetcher";

const useFetchWritersData = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useSWR<Writer[]>("/api/writers", fetcher);

  const nationalities: string[] = [];
  const writersById: Record<number, Partial<Writer>> = {};

  if (Array.isArray(data)) {
    data.forEach((writer) => {
      const writerNationality = writer.nationality?.toLowerCase();
      nationalities.push(writerNationality);
      writersById[writer.id] = {
        ...writer,
        nationality: writerNationality,
        full_name: `${writer.first_name ? writer.first_name + " " : ""}${
          writer.last_name
        }`,
      };
    });
  }

  return {
    writersData: data,
    nationalities: [...new Set(nationalities)],
    writersById,
    errorWriters: error,
    isLoadingWriters: isLoading,
  };
};

export default useFetchWritersData;
