import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import Loading from "./assets/images/loading.gif";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import { Container, Col, Row } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  const retieveUserDetails = (token) => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
          });
        });
    }
  };

  const updateUI = (token) => {
    if (token !== `Bearer null`) {
      const decode = jwtDecode(token);

      setUser({
        id: decode.id,
        isAdmin: decode.isAdmin,
      });
    } else {
      return null;
    }
  };

  const fetchData = () => {
    let fetchUrl = user.isAdmin
      ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
      : `${process.env.REACT_APP_API_BASE_URL}/products/`;

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((user) => {
            setUserDetails(user.user);
            if (user.user?.isAdmin) {
              fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((res) => res.json())
                .then((productData) => {
                  setAllProductsData(productData);
                });
            }
          });
      });
  };
  const fetchProductsData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
      .then((res) => res.json())
      .then((activeProducts) => {
        setActiveProducts(activeProducts.products);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((orders) => {
            setUserOrders(orders.orders);
            setIsLoading(false);
            setTimeout(() => {
              setOpacity(1);
            }, [500]);
          });
      });
  };
  useEffect(() => {
    updateUI(`Bearer ${localStorage.getItem("token")}`);
    fetchProductsData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div
            className="d-flex flex-wrap justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Container fluid>
              <Row>
                <Col className="d-flex justify-content-center">
                  <img
                    src={Loading}
                    alt="loading"
                    style={{ height: "50px", width: "50px" }}
                    className="me-3"
                  />
                  <h1 className="text-center  text-white">
                    Server Initializing...
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="text-white text-center">Please wait...</p>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <UserProvider value={{ user, setUser, unsetUser, retieveUserDetails }}>
          <Router>
            <Navigation retrieveUserDetails={retieveUserDetails} />
            <Routes>
              <Route
                path="/"
                element={
                  <HeroSection opacity={opacity} setOpacity={setOpacity} />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={
                  <Login
                    fetchData={fetchData}
                    setAllProductsData={setAllProductsData}
                    fetchProductsData={fetchProductsData}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile userDetails={userDetails} fetchData={fetchData} />
                }
              />
              <Route
                path="/products"
                element={
                  <Products
                    fetchData={fetchData}
                    products={products}
                    setProducts={setProducts}
                    allProductsData={allProductsData}
                    fetchProductsData={fetchProductsData}
                  />
                }
              />
              <Route
                path="/myorders"
                element={
                  <MyOrders
                    activeProducts={activeProducts}
                    userOrders={userOrders}
                    fetchData={fetchData}
                    fetchProductsData={fetchProductsData}
                  />
                }
              />
              <Route path="/logout" element={<Logout />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </UserProvider>
      )}
    </>
  );
}

export default App;
