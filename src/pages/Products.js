import AdminDashBoard from "../components/AdminDashboard.js";
import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext.js";
import "./Products.css";
import { Container, Row } from "react-bootstrap";

import ProductsCatalogView from "../components/ProductsCatalogView.js";
import CartSummary from "../components/CartSummary.js";

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

  useEffect(() => {
    if (user !== undefined) {
      let fetchUrl = user.isAdmin
        ? `http://ec2-18-222-62-228.us-east-2.compute.amazonaws.com/b7/products/all`
        : `http://ec2-18-222-62-228.us-east-2.compute.amazonaws.com/b7/products/`;

      fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
      if (user.isAdmin === false) {
        fetch(
          `http://ec2-18-222-62-228.us-east-2.compute.amazonaws.com/b7/cart/add-to-cart`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
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
        console.log("products useEffect");
      }
    } else {
      return null;
    }
  }, []);

  return (
    <Container fluid>
      <Row>
        <div className="background-productpage" style={{ height: "100%" }}>
          {user.isAdmin ? (
            <AdminDashBoard
              productsData={products}
              fetchData={fetchData}
              allProductsData={allProductsData}
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
              />
            </>
          )}
        </div>
      </Row>
    </Container>
  );
}
