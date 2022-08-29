import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getTechs } from "../../actions/techActions";

const TechSelectOption = () => {
  const { techs } = useSelector((state) => state.tech);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechs());
  }, []);

  return techs.map((tech) => (
    <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
      {tech.firstName} {tech.lastName}
    </option>
  ));
};

export default TechSelectOption;
