import { Dispatch, SetStateAction } from "react";
import { Table, Input, Select } from "antd";
import styled from "styled-components";

import { Writer } from "../types/common";

type WritersTableProps = {
  writersList: Writer[];
  searchWriter: string;
  setSearchWriter: Dispatch<SetStateAction<string>>;
  writerNationality?: string;
  setWriterNationality: Dispatch<SetStateAction<string | undefined>>;
  nationalities: string[];
  handleNumberOfBookClick: (authorId: number) => void;
};

const WritersTable = ({
  writersList,
  searchWriter,
  setSearchWriter,
  writerNationality,
  setWriterNationality,
  nationalities,
  handleNumberOfBookClick,
}: WritersTableProps) => {
  const columnsWriters = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (_: string, record: Writer) =>
        `${record.first_name ? record.first_name + " " : ""}${
          record.last_name
        }`,
      width: "30%",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
      width: "30%",
    },
    {
      title: "Number of Books",
      dataIndex: "number_of_books",
      key: "number_of_books",
      render: (numberOfBooks: number, record: Writer) => (
        <ActiveCell onClick={() => handleNumberOfBookClick(record.id)}>
          {numberOfBooks}
        </ActiveCell>
      ),
      width: "20%",
    },
  ];

  return (
    <>
      <h3>Writers</h3>
      <ActionsWrapper>
        <Input
          value={searchWriter}
          onChange={(e) => setSearchWriter(e.currentTarget.value)}
          placeholder="Search writer"
          style={{ width: 250 }}
          allowClear
        />
        <Select
          placeholder="Select nationality"
          value={writerNationality}
          style={{ width: 200 }}
          onChange={setWriterNationality}
          options={nationalities.map((n) => ({
            value: n,
            label: n.charAt(0).toUpperCase() + n.slice(1),
          }))}
          allowClear
        />
      </ActionsWrapper>
      <Table
        dataSource={writersList}
        columns={columnsWriters}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

const ActiveCell = styled.div`
  cursor: pointer;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export default WritersTable;
