import { useEffect, useState } from "react";
import { Container, Row, Accordion } from "react-bootstrap";
import ItemsOrdered from "../components/ItemsOrdered";

function MyOrders({
  activeProducts,
  userOrders,
  fetchData,
  fetchProductsData,
}) {
  const [displayOrders, setDisplayOrders] = useState([]);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setDisplayOrders(
      userOrders?.map((order) => {
        return (
          <Accordion key={order.id}>
            <Accordion.Item
              style={{ backgroundColor: "rgba(229, 199, 171, 0.1)" }}
            >
              <Accordion.Header>
                <h6>
                  {` Ordered on: ${order.orderedOn.toString().slice(0, 10)}`}
                </h6>
              </Accordion.Header>
              <Accordion.Body className="text-white">
                <ItemsOrdered
                  key={order.id}
                  itemsOrdered={order.productsOrdered}
                  activeProducts={activeProducts}
                />
                <h6 className="mt-2">{`Total Price: Php. ${Number(
                  order.totalPrice
                ).toFixed(2)}`}</h6>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })
    );
    setOpacity(1);
  }, []);

  return (
    <Container
      fluid
      className="background-productpage"
      style={{ opacity: `${opacity}`, transition: "opacity 1s" }}
    >
      <Row>
        <h1
          className="text-center text-white"
          style={{ marginTop: "6rem", marginBottom: "4rem" }}
        >
          My Orders
        </h1>
        <div>
          {userOrders ? (
            displayOrders
          ) : (
            <h1
              className="text-center text-white"
              style={{ marginTop: "10rem", marginBottom: "30rem" }}
            >
              NO ORDERS YET
            </h1>
          )}
        </div>
      </Row>
    </Container>
  );
}

export default MyOrders;
