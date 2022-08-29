import React from "react";
import { searchLogs } from "../../actions/logActions";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();


  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(searchLogs(e.target.value));
  };

  return (
    <nav style={{ marginBottom: "30px" }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              required
              placeholder='Search Logs...'
              onChange={handleChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default SearchBar;
