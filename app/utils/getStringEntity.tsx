import { Book, Writer } from "../types/common";

const getStringEntity = (entity: Partial<Book> | Writer) =>
  Object.values(entity)
    .reduce((string: string, value) => (string += value), "")
    .toLowerCase();

export default getStringEntity;
