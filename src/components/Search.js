import { useContext, useState } from "react";
import AuthenticationContext from "../AuthenticationContext";
const Search = ({ bookData, setBookData }) => {
  const authContext = useContext(AuthenticationContext);
  const [entry, setEntry] = useState("");
  const currentLocation = [authContext.latitude, authContext.longitude];
  const calculateHaversine = (coordinates) => {
    let lat2 = (coordinates[0] * Math.PI) / 180;
    let lat1 = (currentLocation[0] * Math.PI) / 180;
    let long2 = (coordinates[1] * Math.PI) / 180;
    let long1 = (currentLocation[1] * Math.PI) / 180;
    let result =
      2 *
      6371.009 *
      Math.asin(
        Math.sqrt(
          Math.sin((lat2 - lat1) / 2) * Math.sin((lat2 - lat1) / 2) +
            Math.cos(lat1) *
              Math.cos(lat2) *
              Math.sin((long2 - long1) / 2) *
              Math.sin((long2 - long1) / 2)
        )
      );
    return result;
  };
  const onSearch = async (e) => {
    e.preventDefault();
    let response = await fetch(`/api/search/${entry}`);
    response = await response.json();
    console.log(response);
    if (response.length > 0) {
      setBookData(response);
    } else {
      setBookData(null);
      alert("nothing found");
    }
  };
  return (
    <div>
      <form className="form-control" onSubmit={onSearch}>
        <input
          type="text"
          style={{ width: "100%", fontSize: 17 }}
          placeholder="search for a book"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-block">
          Search
        </button>
      </form>
      {/* {bookData &&
        bookData.map((book, index) => {
          return (
            <p className="task">{`${book.title} by ${
              book.authors
            } is ${Math.round(
              calculateHaversine([book.latitude, book.longitude])
            )} km away`}</p>
          );
        })} */}
    </div>
  );
};

export default Search;
