import { Link } from "react-router-dom";
import style from "../components/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.landingPage}>
      <div className={style.containText}>
        <h1>Bienvenidos a mi Landing Page</h1>
        <Link to="/home">
          <button className={style.btn}>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
