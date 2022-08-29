import React, { useEffect } from "react";
import LogItem from "./LogItem";
import Loader from "../layout/Loader";
import { getLogs } from "../../actions/logActions";
import { useSelector, useDispatch } from "react-redux";

function Logs() {
  // getting the state values from the store
  const { loader, logs } = useSelector((state) => state.log);

  // it is used to dispatch any action to the redux reducers
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatching an action using a action creator
    dispatch(getLogs());
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loader && logs.length == 0 ? (
        <p className='center'>No logs to display...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
}

export default Logs;
