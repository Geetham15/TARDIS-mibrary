import { useContext } from "react";
import MUIDataTable from "mui-datatables";
import AuthenticationContext from "../../AuthenticationContext";

function DataTable({ title, books, columns, setBooks }) {
  const authContext = useContext(AuthenticationContext);
  async function deleteBook(id) {
    console.log(id);
    setBooks(() => {
      let newBooks = books.filter((book) => {
        return book.id !== id;
      });
      return newBooks;
    });
    let response = await fetch("/api/deleteBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, userId: authContext.userId }),
    });
    response = await response.json();
    if (response) {
      alert("Delete was successful");
    } else {
      alert("something went wrong");
    }
  }
  const options = {
    filterType: "checkbox",
    serverSide: false,
    sort: true,
    onRowsDelete: (rowsDeleted) => {
      console.log(rowsDeleted.data);
      for (let i = 0; i < rowsDeleted.data.length; i++) {
        deleteBook(books[rowsDeleted.data[i].dataIndex].id);
      }
    },
  };
  return (
    <div>
      <MUIDataTable
        title={title}
        data={books}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default DataTable;
