import React from "react";
import "./About.css";

const About = (props) => {
  return (
    <div className="container-about">
      <div className="text-about">
        <h1>Hi!</h1>
        <h2>My name is Rodrigo Roman</h2>
        <h3>
          This SPA (Single Page Apliation) is made for the completion of the
          bootcamp Soy Henry. Consuming an external API and creating a database.
          Here you will get knowledge about different breeds of dogs, and you
          can filter according to their temperaments or weights for a better
          experience. Finally, you will have the opportunity to create a new
          breed of dog in our DataBase. The technologies used are:
        </h3>
        <ul className="ul-about">
          <li>
            <p>HTML</p>
          </li>
          <li>
            <p>CSS</p>
          </li>
          <li>
            <p>Redux</p>
          </li>
          <li>
            <p>React</p>
          </li>
          <li>
            <p>JavaScript</p>
          </li>
          <li>
            <p>Express</p>
          </li>
          <li>
            <p>PostgreSQL</p>
          </li>
        </ul>

        <div>
          <h3>Social Media</h3>
          <div className="flex-red">
            <div className="container-red">
              <div className="link">
                <img
                  className="red"
                  src="/img/icons8-github.svg"
                  alt="logo"
                />
                <a target="_blank" href="https://www.github.com/Rodri7Roman">
                  Rodrigo Román
                </a>
              </div>
            </div>
            <div className="container-red">
              <div className="link">
                <img className="red" src="/img/icons8-linkedin.svg" alt="logo" />
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/rodrigo-roman-0a58811b0/"
                >
                  Rodrigo Román
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="img-about">
        <img src="/img/about-me.png" alt="" />
      </div>
    </div>
  );
};

export default About;
