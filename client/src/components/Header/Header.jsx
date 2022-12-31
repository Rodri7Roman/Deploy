import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="banner-container">
        <div className="text-container">
          <h1>The best company of the human being.</h1>
          <p>
            Hello! Here you can search and learn about many breeds of dogs. I
            assure you that you will be surprised with what you will learn about
            them. You can also create the breed that you want. Cheers!
          </p>
        </div>

        <img src="/img/dogs.png" alt="img dogs" />
      </div>
      <div className="choose-container">
        <h2>Choose what to do</h2>
        <p>
          Here below you will have options to choose what to do. You can choose
          between create a new breed, learn about different breeds and know
          more about this project.
        </p>
        <div className="options-container">
          <div>
            <img src="/img/conoc.png" alt="image dog" />
            <h3 className="options-title">Learn about breeds</h3>
            <p>You will gain knowledge about different breeds of dogs</p>
            <a href="#cards">
              <button>Click here!</button>
            </a>
          </div>
          <div>
            <img src="/img/create.png" alt="image dog" />
            <h3 className="options-title">Create a dog</h3>
            <p>You will have the opportunity to create a breed of dog</p>
            <NavLink to="/createDog">
              <button>Click here!</button>
            </NavLink>
          </div>
          <div>
            <img src="/img/about.png" alt="image dog" />
            <h3 className="options-title">Know more about this project</h3>
            <p>You will get information about this project</p>
            <NavLink to="/about">
              <button>Click here!</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
