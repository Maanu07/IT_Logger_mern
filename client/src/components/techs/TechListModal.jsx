import React, { useEffect } from "react";
import TechItem from "./TechItem";
import { getTechs } from "../../actions/techActions";
import { useDispatch, useSelector } from "react-redux";

function TechListModal() {
  const { techs } = useSelector((state) => state.tech);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechs());
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician list</h4>
        <ul className='collection'>
          {techs.map((tech) => (
            <TechItem tech={tech} key={tech.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TechListModal;
