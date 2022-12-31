import React from "react";
import "./Dog.css"

const Dog = ({ image, name, temperament, weight }) => {
  return (
    <div>
      <img src={image} alt="img not found" width="280px" height="230px" className="img"/>
      <h3 className="name">{name}</h3>
      <h2 className="title">Temperaments</h2>
      <h3 className="temperaments">{temperament}</h3>
      <h2 className="title">Weight</h2>
      <h3 className="weight">{`${weight.at(0)} - ${weight.at(1)} Kg`}</h3>
    </div>
  );
};

export default Dog;
