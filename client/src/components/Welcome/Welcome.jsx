import "./Welcome.css";

const Welcome = (props) => {
  return (
    <div className="container-ingresar">
      <div className="button-c">
        <button className="button-ingresar" onClick={props.access}>
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Welcome;
