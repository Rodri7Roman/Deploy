import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDog } from "../../redux/actions";
import { getDog } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Detail.css";

const Detail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dog = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(getDog(id));

    return () => {
      dispatch(cleanDog());
    };
  }, [dispatch]);

  const backToHome = (e) => {
    navigate("/home");
  };
  return (
    <>
      <div className="container-button">
        <button onClick={backToHome} className="back-home">
          Back To Home
        </button>
      </div>

      <div className="detail-container">
        {dog && Object.keys(dog).length !== 0 ? (
          <div className="container-card">
            <h3 className="text-detail">{dog.name}</h3>
            <div className="dates-flex">
              <div className="container-img">
                <img
                  src={dog.image}
                  alt="img not found"
                  width="280px"
                  height="230px"
                  className="img-detail"
                />
              </div>
              <div className="container-info">
                <div className="container-detail">
                  <h2 className="title-detail">Temperaments</h2>
                  <h2 className="detail-text">
                    {dog.temperament
                      ? dog.temperament
                      : dog.temperaments?.map((e, i) => {
                          if (i !== dog.temperaments.length - 1)
                            return e.name + ", ";
                          else return e.name;
                        })}
                  </h2>
                </div>

                <div className="container-detail">
                  <h2 className="title-detail">Height</h2>
                  <h3 className="detail-text">{`${
                    dog.height.at(0) ? dog.height.at(0) : "undefined"
                  } - ${
                    dog.height.at(1) ? dog.height.at(1) : "undefined"
                  } cm`}</h3>
                </div>
                <div className="container-detail">
                  <h2 className="title-detail">Weight</h2>
                  <h3 className="detail-text">{`${
                    dog.weight.at(0)  ? dog.weight.at(0) : "undefined"
                  } - ${
                    dog.weight.at(1) ? dog.weight.at(1) : "undefined"
                  } kg`}</h3>
                </div>
                <div className="container-detail">
                  <h2 className="title-detail">Life Span</h2>
                  <h3 className="detail-text">{dog.life_span} {dog.createInDb? "years" : ""}</h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Detail;
