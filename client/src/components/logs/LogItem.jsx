import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteLog, setCurrent } from "../../actions/logActions";
import M from "materialize-css/dist/js/materialize.min.js";
import moment from 'moment'

const LogItem = ({ log }) => {
  const dispatch = useDispatch();

  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${
            log.attention ? "red-text" : "blue-text"
          }`}
          onClick={() => dispatch(setCurrent(log))}
        >
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{log.id}</span> last updated by
          <span className='black-text'> {log.tech}</span> on
          <span> {moment(log.date).format('MMMM Do YYYY, h:mm:ss a')}</span>
        </span>
        <a
          href='#!'
          className='secondary-content'
          onClick={() => {
            dispatch(deleteLog(log._id));
            M.toast({ html: "Log Deleted" });
          }}
        >
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default LogItem;
