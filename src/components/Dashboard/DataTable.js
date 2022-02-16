import { DataGrid } from "@mui/x-data-grid";
const columns = [
  { field: "title", headerName: "Title", width: 150 },
  { field: "authors", headerName: "Author", width: 150 },
  { field: "condition", headerName: "Condition", width: 150 },
  { field: "comments", headerName: "Comments", width: 150 },
  // { field: "DateLent", headerName: "Date Lent", width: 150 },
  // { field: "ExpectedReturn", headerName: "Expected Return", width: 150 },
  // { field: "DateReturned", headerName: "Date Returned", width: 150 },
  // { field: "BorrowerName", headerName: "Borrower Name", width: 150 },
  // { field: "BorrowerId", headerName: "Borrower ID", width: 150 },
];

const DataTable = ({ books }) => {
  const rows = books;
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
