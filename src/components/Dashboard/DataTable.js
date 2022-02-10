import { React, useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import BookRow from "../BookList";
const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 150 },
  { field: "author", headerName: "Author", width: 150 },
  { field: "isbn", headerName: "ISBN", width: 150 },
  { field: "DateLent", headerName: "DateLent", width: 150 },
  { field: "DateReturned", headerName: "DateReturned", width: 150 },
];

const rows: GridRowsProp = [
    {
      id: 1,
      title: "Neuromancer",
      author: "William Gibson",
      isbn: "978-0441569595",
      DateLent: "10-04-2022",
      DateReturned: "02-07-2022",
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
