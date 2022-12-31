import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { createDog, getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Validation from "../Validation/Validation";
import "./Create.css";

const Create = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const error = useSelector((state) => state.error);
  // guardar los datos del form
  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });
  const [buttonActive, setButtonActive] = useState(false);

  // todo lo que tiene el input cambiando dependiendo el name que se este modificando
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(Validation({ ...input, [e.target.name]: e.target.value }));

    // console.log(input);
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
    // console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(input);
    dispatch(createDog(input));
    setInput({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      life_span: "",
      image: "",
      temperament: [],
    });
  };

  const handleDelete = (elemento) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== elemento),
    });
  };

  // obtener los temperamentos cuando se monta el componente
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  console.log(Object.keys(input));
  return (
    <div className="container-create">
      <div className="container-input-create">
        <h1>Create a dog</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-create">
            <label>
              Name <span>*</span>
            </label>
            <div>
              <input
                type="text"
                onChange={handleChange}
                value={input.name}
                name="name"
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
          </div>
          <div className="number-create">
            <label>
              Height <span>*</span>
            </label>
            <div className="input-errors">
              <div>
                <input
                  type="number"
                  onChange={handleChange}
                  value={input.min_height}
                  name="min_height"
                />
                {errors.min_height && <p>{errors.min_height}</p>}
              </div>

              <h2 className="line"> - </h2>
              <div>
                <input
                  type="number"
                  onChange={handleChange}
                  value={input.max_height}
                  name="max_height"
                />
                {errors.max_height && <p>{errors.max_height}</p>}
              </div>
            </div>
          </div>
          <div className="number-create">
            <label>
              Weight <span>*</span>
            </label>
            <div className="input-errors">
              <div>
                <input
                  type="number"
                  onChange={handleChange}
                  value={input.min_weight}
                  name="min_weight"
                />
                {errors.min_weight && <p>{errors.min_weight}</p>}
              </div>

              <h2 className="line"> - </h2>
              <div>
                <input
                  type="number"
                  onChange={handleChange}
                  value={input.max_weight}
                  name="max_weight"
                />
                {errors.max_weight && <p>{errors.max_weight}</p>}
              </div>
            </div>
          </div>
          <div className="text-create">
            <label>Life Span</label>
            <input
              type="number"
              onChange={handleChange}
              value={input.life_span}
              name="life_span"
            />
            {errors.life_span && <p>{errors.life_span}</p>}
          </div>
          <div className="text-create">
            <label>Image</label>
            <input
              type="text"
              onChange={handleChange}
              value={input.image}
              name="image"
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div className="text-create">
            <label>Temperaments</label>
            <select name="temperaments" onChange={handleSelect}>
              {temperaments?.map((temperament) => {
                return (
                  <option value={temperament.name} key={temperament.id}>
                    {temperament.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            disabled={
              errors.name ||
              errors.max_height ||
              errors.min_height ||
              errors.min_weight ||
              errors.max_weight
                ? !buttonActive
                : buttonActive
            }
            className={
              errors.name ||
              errors.max_height ||
              errors.min_height ||
              errors.min_weight ||
              errors.max_weight
                ? "button-create-off "
                : "button-create-on"
            }
          >
            Create dog
          </button>
        </form>
        {input.temperament.map((temp) => (
          <div className="container-temp">
            <p className="temp">{temp}</p>
            <button onClick={() => handleDelete(temp)} className="delete-temp">x</button>
          </div>
        ))}
      </div>
      <div className="preview">
        <h2>Here you will see the progress</h2>

        <>
          {input.image && <img src={input.image} alt="Img not found" />}

          <div className="info-preview">
            <h3 className="name-progress">{input.name}</h3>
            <div>
              <p className="title-dates">Height</p>
              <p className="text-dates">
                {input.min_height &&
                  `${input.min_height} - ${input.max_height} cm`}
              </p>{" "}
            </div>
            <div>
              <p className="title-dates">Weight</p>
              <p className="text-dates">
                {input.min_weight &&
                  `${input.min_weight} - ${input.max_weight} kg`}
              </p>
            </div>
            <div>
              <p className="title-dates">Life span</p>
              <p className="text-dates">
                {input.life_span && `${input.life_span} years`}
              </p>
            </div>
            <div className="temp-preview">
              <p className="title-dates">Temperaments:</p>
              {input.temperament.length !== 0
                ? input.temperament.map((t, i) => {
                    if (i !== input.temperament.length - 1)
                      return <p className="text-dates">{`${t} ,`}</p>;
                    else return <p className="text-dates"> {t}.</p>;
                  })
                : ""}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Create;
