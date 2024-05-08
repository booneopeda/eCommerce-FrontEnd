import { useEffect, useContext, useState } from "react";
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
  setIsLoading,
  isLoading,
  opacity,
  setOpacity,
}) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.id !== null) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    }
  }, []);

  return (
    <div style={{ opacity: `${opacity}`, transition: "opacity 1s" }}>
      <h1
        className="text-center text-white"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        Products Catalog
      </h1>
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {productsData.map((product) => {
          setTimeout(() => {
            setOpacity(1);
          }, [200]);
          setIsLoading(false);

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
      </Container>
    </div>
  );
}

export default ProductsCatalogView;
