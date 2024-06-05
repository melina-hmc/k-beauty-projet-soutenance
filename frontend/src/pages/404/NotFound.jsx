import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="--center-all" style={{ minHeight: "80vh" }}>
      <h2>Page Introuvable</h2>
      <p>La page que vous recherchez est introuvable !</p>
      <br />
      <Link to={"/"}>
        <button className="--btn --btn-primary">Retour à la page d'accueil</button>
      </Link>
    </div>
  );
};

export default NotFound;
