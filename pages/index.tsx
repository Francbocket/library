import { useState } from "react";
import { Spin } from "antd";
import styled from "styled-components";

import { Book, Writer } from "@/app/types/common";
import BooksTable from "@/app/components/BooksTable";
import useFindWriters from "@/app/hooks/useFindWriters";
import useFindBooks from "@/app/hooks/useFindBooks";
import WritersTable from "@/app/components/WritersTable";
import useFetchWritersData from "@/app/hooks/useFetchWritersData";
import useFetchBooksData from "@/app/hooks/useFetchBooksData";

const Home = () => {
  const {
    writersData = [],
    nationalities = [],
    writersById = {},
    errorWriters,
    isLoadingWriters,
  } = useFetchWritersData();
  const {
    booksData = [],
    errorBooks,
    isLoadingBooks,
  } = useFetchBooksData({ writersById });

  const [writersList, setWritersList] = useState<Writer[]>(writersData);
  const [booksList, setBooksList] = useState<Book[]>(booksData);
  const [searchWriter, setSearchWriter] = useState<string>("");
  const [searchBook, setSearchBook] = useState<string>("");
  const [writerNationality, setWriterNationality] = useState<string>();
  const [bookNationality, setBookNationality] = useState<string>();
  const [clickedAuthor, setClickedAuthor] = useState<Partial<Writer> | null>(
    null
  );

  useFindWriters({
    search: searchWriter,
    list: writersData,
    setter: setWritersList,
    nationality: writerNationality || "",
  });

  useFindBooks({
    search: searchBook,
    list: booksData,
    setter: setBooksList,
    nationality: bookNationality || "",
    clickedAuthorId: clickedAuthor?.id,
  });

  const handleNumberOfBookClick = (authorId: number) => {
    setSearchWriter("");
    setWriterNationality(undefined);
    setClickedAuthor(writersById[authorId]);
  };

  const handleResetClickedAuthor = () => {
    setClickedAuthor(null);
  };

  if (errorWriters || errorBooks) return <div>Failed to load</div>;

  return (
    <main>
      <Wrapper>
        {isLoadingWriters || isLoadingBooks ? (
          <Spin />
        ) : (
          <>
            <ColWrapper>
              <WritersTable
                writersList={writersList}
                searchWriter={searchWriter}
                setSearchWriter={setSearchWriter}
                writerNationality={writerNationality}
                setWriterNationality={setWriterNationality}
                nationalities={nationalities}
                handleNumberOfBookClick={handleNumberOfBookClick}
              />
            </ColWrapper>
            <ColWrapper>
              <BooksTable
                booksList={booksList}
                searchBook={searchBook}
                setSearchBook={setSearchBook}
                bookNationality={bookNationality}
                setBookNationality={setBookNationality}
                nationalities={nationalities}
                clickedAuthor={clickedAuthor}
                handleResetClickedAuthor={handleResetClickedAuthor}
              />
            </ColWrapper>
          </>
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const ColWrapper = styled.div`
  width: 40%;
`;

export default Home;
