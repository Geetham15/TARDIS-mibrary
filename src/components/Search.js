import { useState } from "react";
const Search = () => {
  const [entry, setEntry] = useState("");
  const [bookData, setBookData] = useState(null);
  const currentLocation = [50.89936444465098, -114.02898163766635];
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
    if (response) {
      setBookData(response);
      let distance = Math.round(calculateHaversine(response.location));
      setBookData({ ...bookData, distance: distance });
    } else {
      setBookData(null);
      alert("nothing found");
    }
  };
  return (
    <div className="container">
      <form className="form-control" onSubmit={onSearch}>
        <input
          type="text"
          placeholder="search for a book"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-block">
          Search
        </button>
      </form>
      {bookData && (
        <p className="task">{`${bookData.title} by ${bookData.authors} is ${bookData.distance}km away`}</p>
      )}
    </div>
  );
};

export default Search;
