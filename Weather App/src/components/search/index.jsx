import PropTypes from "prop-types";

export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="searchEngine">
      <input
        type="text"
        placeholder="Search city"
        value={search}
        className="inputSection"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="searchBtn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
