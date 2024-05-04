import "./HeroSection.css";
import Diamond from "../assets/images/diamond.png";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

export default function HeroSection({ setAllProductsData }) {
  const { user } = useContext(UserContext);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, []);
  }, []);

  return (
    <Container
      fluid
      style={{ opacity: `${opacity}`, transition: "opacity 1s" }}
    >
      <Row>
        <div className="text-center background">
          <img src={Diamond} alt="diamond" className="diamondImg" />
          <h1 className="red-hat-display-main ms-4" id="title">
            STOP
            <span className="red-hat-display-main" id="En">
              N
            </span>
            SHOP
          </h1>
          <p className="sub-heading d-none d-lg-inline">
            Your one-stop shop. Sky is the limit.
          </p>
          <div className=" btn--container mt-3 mt-md-5">
            <Link to={"/products"}>
              <button className="btn--shop" id="btnshop">
                <span>SHOP</span>
              </button>
            </Link>
            {user.id !== null ? null : (
              <Link to={"/register"}>
                <button className="btn--signin" id="btnsignin">
                  SIGN UP
                </button>{" "}
              </Link>
            )}
          </div>
        </div>
      </Row>
    </Container>
  );
}
