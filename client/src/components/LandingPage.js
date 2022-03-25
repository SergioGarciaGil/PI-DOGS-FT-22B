import React from "react";
import { Link } from "react-router-dom";

import React from "react";

const LandingPage = () => {
  return (
    <div>
      <h1>Bienvenidos a mi Landing Page</h1>
      <Link to="/home">
        <button>Ingrsar</button>
      </Link>
    </div>
  );
};

export default LandingPage;
