import { useState } from "react";

const AddBooks = () => {
  const [bookData, setBookData] = useState({
    comments: "",
    condition: "",
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
    let author = await fetch(
      `https://openlibrary.org${response.authors[0].key}.json`
    );
    author = await author.json();
    response.authors = author;
    console.log(author);
    console.log(response);
    const {
      authors,
      title,
      number_of_pages,
      description,
      physical_format,
      subjects,
    } = response;
    setBookData({
      ...bookData,
      authors,
      title,
      number_of_pages,
      description,
      physical_format,
      subjects,
    });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setBookData({ ...bookData, [name]: value });
  };
  const clearContents = () => {
    setBookData({
      comments: "",
      isbn: "",
      condition: "",
    });
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
        <form className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.authors.name}
            onChange={handleChange}
          />
          <label htmlFor="pages">Pages</label>
          <input
            type="text"
            id="pages"
            name="pages"
            value={bookData.number_of_pages}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={bookData.description?.value}
            onChange={handleChange}
          />
          <label htmlFor="binding">Binding</label>
          <input
            type="text"
            id="binding"
            name="physical_format"
            value={bookData.physical_format}
            onChange={handleChange}
          />
          <label htmlFor="subjects">Subjects</label>
          <input
            type="text"
            id="subjects"
            name="subjects"
            value={bookData.subjects?.join(", ")}
            onChange={handleChange}
          />
          <label htmlFor="comments">Comments</label>
          <input
            type="text"
            id="comments"
            name="comments"
            value={bookData.comments}
            onChange={handleChange}
          />
          <label htmlFor="condition">Condition</label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={bookData.condition}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-block">
            Add to personal library
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBooks;
