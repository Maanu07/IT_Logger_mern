import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { addLog } from "../../actions/logActions";
import { useDispatch } from "react-redux";
import TechSelectOption from "../techs/techSelectOption";

const AddLogsModal = () => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const dispatch = useDispatch();

  // when user submits a new log from the modal
  const onSubmit = () => {
    if (message == "" || tech == "") {
      // if message or tech is empty we are displaying this little popup
      M.toast({ html: "Please enter a message & tech" });
    } else {
      const log = {
        message,
        attention,
        tech,
        date: new Date(),
      };
      dispatch(addLog(log));
      M.toast({ html: `Log added by ${tech}` });
      // clear the fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
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
              <TechSelectOption />
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

export default AddLogsModal;
