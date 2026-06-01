import "./mail.css";

import React from "react";

const Mail = () => {
  return ( <div className="m">
      <div className="m-left">
          <h1 className="m-title">
              join our mailing <br />
              list
          </h1>
          <p className="m-exp">
              sign up to our mailing list to be the first <br />
              to know about our new projects, <br />
              updates and design and to build some <br />
              projects - get opportunities !
              <br />
              <br />
              calivn studio do not spare your <br />
              information with third parties :-)
          </p>
      </div>
      <div className="m-right">
      <input type="text" class="css-input" placeholder="First Name" />
      <input type="text" class="css-input-two" placeholder="Last Name" />
      <input type="text" class="css-input-three" placeholder="Email Address" />
      </div>

      <a href="#" class="myButton-f">Sign Up</a>

        <div className="m-links">
        <a href="#" className="m-fac"> [ mail ]</a>
        <a href="#" className="m-fac">[instagram]</a>
        <a href="#" className="m-fac">[ Facebook ]</a>
        <a href="#" className="m-fac">[youtube]</a>
            
        </div>
  </div>
  );
};

export default Mail;
