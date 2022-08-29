import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { useDispatch, useSelector } from "react-redux";
import { updateLog } from "../../actions/logActions";
import TechSelectOption from "../techs/techSelectOption";

const EditLogsModal = () => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const currentLog = useSelector((state) => state.log.current);
  const dispatch = useDispatch();

  // whenever we click to update the logs, the edit log modal is automatically filled with current values
  useEffect(() => {
    if (currentLog) {
      setMessage(currentLog.message);
      setAttention(currentLog.attention);
      setTech(currentLog.tech);
    }
  }, [currentLog]);

  const onSubmit = () => {
    if (message == "" || tech == "") {
      M.toast({ html: "Please enter a message & tech" });
    } else {
      const updatedLog = {
        ...currentLog,
        message,
        attention,
        tech,
      };
      dispatch(updateLog(updatedLog));
      M.toast({ html: `Log updated by ${tech}` });
      // clear the fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={(e) => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              {<TechSelectOption />}
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#'
          onClick={onSubmit}
          className='modal-close waves-effect waves-clean btn blue'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%",
};

export default EditLogsModal;
