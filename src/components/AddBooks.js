import { useState } from "react";

const AddBooks = () => {
  const [bookData, setBookData] = useState({
    comments: "",
    condition: "gently used",
  });
  const searchIsbn = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `https://openlibrary.org/isbn/${bookData.isbn}.json`
    );

    response = await response.json();
    console.log(response);
    if (response.error) {
      alert("Nothing found");
      setBookData({ ...bookData, isbn: "" });
      return;
    }
    if (response.authors) {
      let author = await fetch(
        `https://openlibrary.org${response.authors[0].key}.json`
      );
      author = await author.json();
      console.log(author);
      response.authors = author.name;
      if (!author.name) {
        response.authors = author.personal_name;
      }
      console.log(author);
    } else {
      response.authors = "";
    }

    console.log(response);
    const { authors, title, physical_format, isbn_13, isbn_10 } = response;
    setBookData({
      ...bookData,
      authors,
      title,
      physical_format,
      isbn_13: isbn_13 ? isbn_13[0] : null,
      isbn_10: isbn_10 ? isbn_10[0] : null,
    });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "subjects") {
      value = value.split(", ");
    }
    setBookData({ ...bookData, [name]: value });
  };
  const handleRadioChange = (e) => {
    setBookData({ ...bookData, condition: e.target.value });
  };
  const clearContents = () => {
    setBookData({
      comments: "",
      isbn: "",
      condition: "gently used",
    });
  };
  const addToLibrary = async (e) => {
    e.preventDefault();
    // this will connect to user's database
    console.log("added to database", bookData);
    let response = await fetch("/api/addBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...bookData,
        authors: bookData.authors,
      }),
    });
    response = await response.json();
    clearContents();
    alert(response.title + " added to library");
  };
  return (
    <div className="container">
      <form onSubmit={searchIsbn} className="form-control">
        <input
          type="text"
          value={bookData.isbn}
          name="isbn"
          onChange={handleChange}
          placeholder="enter ISBN here"
        />
        <button type="submit" className="btn">
          Search
        </button>
        <button type="reset" className="btn" onClick={clearContents}>
          Clear
        </button>
      </form>
      {bookData.title && (
        <form className="form-control" onSubmit={addToLibrary}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            disabled
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="authors"
            value={bookData.authors}
            onChange={handleChange}
            required
          />
          {/* <label htmlFor="pages">Pages</label>
          <input
            type="text"
            id="pages"
            name="number_of_pages"
            value={bookData.number_of_pages}
            onChange={handleChange}
          /> */}
          {/* <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={bookData.description?.value}
            onChange={handleChange}
          /> */}
          <label htmlFor="binding">Binding</label>
          <input
            type="text"
            id="binding"
            name="physical_format"
            value={bookData.physical_format}
            onChange={handleChange}
          />
          {/* <label htmlFor="subjects">
            Subjects (separated by comma + space)
          </label>
          <input
            type="text"
            id="subjects"
            name="subjects"
            value={bookData.subjects?.join(", ")}
            onChange={handleChange}
          /> */}
          <label htmlFor="comments">Comments</label>
          <input
            type="text"
            id="comments"
            name="comments"
            value={bookData.comments}
            onChange={handleChange}
          />
          <label>Condition</label>
          <div className="form-control-check">
            <label htmlFor="new">new</label>
            <input
              type="radio"
              id="new"
              name="condition"
              value="new"
              checked={bookData.condition === "new" ? true : false}
              onChange={handleRadioChange}
            />
            <label htmlFor="gently_used">gently used</label>
            <input
              type="radio"
              id="gently_used"
              name="condition"
              value="gently used"
              checked={bookData.condition === "gently used" ? true : false}
              onChange={handleRadioChange}
            />
            <label htmlFor="old">old</label>
            <input
              type="radio"
              id="old"
              name="condition"
              value="old"
              checked={bookData.condition === "old" ? true : false}
              onChange={handleRadioChange}
            />
          </div>
          <button type="submit" className="btn btn-block">
            Add to personal library
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBooks;
