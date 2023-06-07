import { ClearOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction } from "react";
import { Table, Input, Select, Button } from "antd";
import styled from "styled-components";

import { Book, Writer } from "../types/common";

type BooksTableProps = {
  booksList: Book[];
  searchBook: string;
  setSearchBook: Dispatch<SetStateAction<string>>;
  bookNationality?: string;
  setBookNationality: Dispatch<SetStateAction<string | undefined>>;
  nationalities: string[];
  clickedAuthor: Partial<Writer> | null;
  handleResetClickedAuthor: () => void;
};

const BooksTable = ({
  booksList,
  searchBook,
  setSearchBook,
  bookNationality,
  setBookNationality,
  nationalities,
  clickedAuthor,
  handleResetClickedAuthor,
}: BooksTableProps) => {
  const columnsBooks = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "20%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Author",
      dataIndex: "author_name",
      key: "author_name",
      width: "30%",
    },
    {
      title: "Year of Publication",
      dataIndex: "year",
      key: "year",
      width: "20%",
    },
  ];

  return (
    <>
      <HeaderWrapper>
        <h3>
          <span>Books</span>
        </h3>
        {clickedAuthor ? (
          <>
            <span className="author-name">
              (Author: {clickedAuthor.full_name})
            </span>
            <Button
              shape="circle"
              icon={<ClearOutlined />}
              onClick={handleResetClickedAuthor}
            />
          </>
        ) : null}
      </HeaderWrapper>
      <ActionsWrapper>
        <Input
          value={searchBook}
          onChange={(e) => setSearchBook(e.currentTarget.value)}
          placeholder="Search book"
          style={{ width: 250 }}
          allowClear
        />
        <Select
          placeholder="Select author nationality"
          value={bookNationality}
          style={{ width: 200 }}
          onChange={setBookNationality}
          options={nationalities.map((n) => ({
            value: n,
            label: n.charAt(0).toUpperCase() + n.slice(1),
          }))}
          allowClear
        />
      </ActionsWrapper>
      <Table
        dataSource={booksList}
        columns={columnsBooks}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin-right: 10px;
  }

  .author-name {
    margin-right: 6px;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export default BooksTable;
