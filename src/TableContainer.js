import React, { Fragment } from "react";

import { Table, Row, Col, Button, Input, CustomInput } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const table = useReactTable({
    columns,
    data,
    defaultColumn: { Filter: DefaultColumnFilter },
    initialState: { pageIndex: 0, pageSize: 10 },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    // setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    // gotoPage(page);
  };

  return (
    <Fragment>
      <Table bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {/* <div {...column.getSortByToggleProps()}> */}
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* {generateSortingIndicator(column)} */}
                  {/* </div> */}
                  {/* <Filter column={column} /> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {/* {row.isExpanded && (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {renderRowSubComponent(row)}
                  </td>
                </tr>
              )} */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default TableContainer;

/*

      <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Col md={3}>
          <Button
            color="primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>
          <Button
            color="primary"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page <strong>{{pageIndex + 1} of {pageOptions.length} }</strong>
        </Col>
        <Col md={2}>
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <CustomInput
            type="select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </CustomInput>
        </Col>
        <Col md={3}>
          <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
            {">"}
          </Button>
          <Button
            color="primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
        </Col>
      </Row> 
      */
