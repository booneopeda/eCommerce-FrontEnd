import { useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import UserContext from "../UserContext.js";
import { Container, Row, Col } from "react-bootstrap";

function ProductsCatalogView({
  productsData,
  fetchData,
  showCart,
  setShowCart,
  isEmpty,
  setIsEmpty,
  fetchProductsData,
}) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.id !== null) {
      fetch(
        `http://ec2-18-222-62-228.us-east-2.compute.amazonaws.com/b7/cart/add-to-cart`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
    }
  }, []);

  return (
    <>
      <h1
        className="text-center text-white"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        Products Catalog
      </h1>
      <Container>
        <Row>
          <Col className=" d-flex flex-wrap justify-content-center">
            {productsData.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  showCart={showCart}
                  setShowCart={setShowCart}
                  fetchData={fetchData}
                  isEmpty={isEmpty}
                  setIsEmpty={setIsEmpty}
                  fetchProductsData={fetchProductsData}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductsCatalogView;
