import AdminDashBoard from "../components/AdminDashboard.js";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext.js";
import "./Products.css";
import { Container, Row, Col } from "react-bootstrap";

import ProductsCatalogView from "../components/ProductsCatalogView.js";
import CartSummary from "../components/CartSummary.js";
import Loading from "../assets/images/loading.gif";

export default function Products({
  fetchData,
  products,
  setProducts,
  allProductsData,
  fetchProductsData,
}) {
  const { user } = useContext(UserContext);

  const [isEmpty, setIsEmpty] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      let fetchUrl = user.isAdmin
        ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
        : `${process.env.REACT_APP_API_BASE_URL}/products/`;

      fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
      if (user.isAdmin === false) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (
              data.message === "No cart found" ||
              data.cart[0].cartItems.length === 0
            ) {
              setIsEmpty(true);
            } else {
              setIsEmpty(false);
            }
          });
        console.log("products useEffect");
      }
    } else {
      return null;
    }
  }, []);

  return (
    <>
      <>
        <div
          className={
            isLoading
              ? `d-flex flex-wrap justify-content-center align-items-center`
              : `hidden`
          }
          style={{ height: "100vh" }}
        >
          <Container fluid>
            <Row>
              <Col className="d-flex justify-content-center">
                <img
                  src={Loading}
                  alt="loading"
                  style={{ height: "100px", width: "100px" }}
                  className="me-3"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </>
      <Container fluid className={isLoading ? "hidden" : ""}>
        <Row>
          <div className="background-productpage" style={{ height: "100%" }}>
            {user.isAdmin ? (
              <AdminDashBoard
                productsData={products}
                fetchData={fetchData}
                allProductsData={allProductsData}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            ) : (
              <>
                <CartSummary
                  productsData={products}
                  fetchData={fetchData}
                  isEmpty={isEmpty}
                  setIsEmpty={setIsEmpty}
                  setShowCart={setShowCart}
                  showCart={showCart}
                  fetchProductsData={fetchProductsData}
                />
                <ProductsCatalogView
                  productsData={products}
                  fetchData={fetchData}
                  setShowCart={setShowCart}
                  showCart={showCart}
                  isEmpty={isEmpty}
                  setIsEmpty={setIsEmpty}
                  fetchProductsData={fetchProductsData}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
}
