import { React, useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import BookRow from "../BookList";
const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 150 },
  { field: "author", headerName: "Author", width: 150 },
  { field: "isbn", headerName: "ISBN", width: 150 },
  { field: "DateLent", headerName: "Date Lent", width: 150 },
  { field: "ExpectedReturn", headerName: "Expected Return", width: 150 },
  { field: "DateReturned", headerName: "Date Returned", width: 150 },
  { field: "BorrowerName", headerName: "Borrower Name", width: 150 },
  { field: "BorrowerId", headerName: "Borrower ID", width: 150 },
];

const rows: GridRowsProp = [
    {
      id: "user.id",
      title: "user.title",
      author: "user.author",
      isbn: "ISBN_10",
      DateLent: "10-04-2022",
      DateReturned: "02-07-2022",
      ExpectedReturn:"",
      BorrowerName:"Borrower Name",
      BorrowerId:"Borrower ID",
    },
    {
      id: 2,
      title: "Burning Chrome",
      author: "Robert K.Dyck",
      isbn: "978-04415456595",
      DateLent: "01-01-2022",
      DateReturned: "",
    },
    {
      id: 3,
      title: "Johnny Mneumonic",
      author: "Stanley Kubrick",
      isbn: "978-0444546769595",
      DateLent: "10-31-2021",
      DateReturned: "02-04-2022",
    },
  ],
  DataTable = (listBook) => {
    return (
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
        
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    );
  };

export default DataTable;
