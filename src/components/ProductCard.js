import { memo, useState } from "react";
import "./ProductCard.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductDetailsView from "./ProductDetailsView";

function ProductCard({
  product,
  showCart,
  setShowCart,
  fetchData,
  isEmpty,
  setIsEmpty,
  fetchProductsData,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const showDetailsModal = (productId) => {
    fetch(`https://ecommerce-webapp-aokf.onrender.com/b7/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setImgUrl(data.product.imgUrl);
      });

    setShowDetails(true);
  };

  return (
    <>
      <Link onClick={() => showDetailsModal(product._id)} id="modal-link">
        <Card
          style={{
            width: "13rem",
            textAlign: "center",
            margin: "1rem",
            backgroundColor: "rgba(229, 199, 171, 1)",
          }}
          className="d-none d-md-flex"
        >
          <Card.Img
            variant="top"
            src={product.imgUrl}
            alt="productPhoto"
            style={{ height: "15rem" }}
          />
          <Card.Body>
            <Card.Title className="overflow-hidden text-truncate text-nowrap">
              {product.name}
            </Card.Title>
            <Card.Subtitle className="overflow-hidden text-truncate text-nowrap">
              {product.description}
            </Card.Subtitle>
            <Card.Text>{`PHP ${Number(product.price).toFixed(2)}`}</Card.Text>
          </Card.Body>
        </Card>
      </Link>

      <ProductDetailsView
        setShowDetails={setShowDetails}
        showDetails={showDetails}
        price={price}
        name={name}
        description={description}
        imgUrl={imgUrl}
        productId={product._id}
        showCart={showCart}
        setShowCart={setShowCart}
        fetchData={fetchData}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
        fetchProductsData={fetchProductsData}
      />
      <Link onClick={() => showDetailsModal(product._id)} id="modal-link">
        <Card
          style={{
            width: "9.6rem",
            textAlign: "center",
            margin: ".5rem",
            backgroundColor: "rgba(229, 199, 171, 1)",
          }}
          className="d-md-none"
        >
          <Card.Img
            variant="top"
            src={product.imgUrl}
            alt="productPhoto"
            style={{ height: "10rem" }}
          />
          <Card.Body>
            <Card.Title
              style={{ fontSize: "15px" }}
              className="overflow-hidden text-truncate text-nowrap"
            >
              {product.name}
            </Card.Title>
            <Card.Subtitle className="overflow-hidden text-truncate text-nowrap">
              {product.description}
            </Card.Subtitle>
            <Card.Text>{`PHP ${Number(product.price).toFixed(2)}`}</Card.Text>
          </Card.Body>
        </Card>
      </Link>

      <ProductDetailsView
        setShowDetails={setShowDetails}
        showDetails={showDetails}
        price={price}
        name={name}
        description={description}
        imgUrl={imgUrl}
        productId={product._id}
        showCart={showCart}
        setShowCart={setShowCart}
        fetchData={fetchData}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
        fetchProductsData={fetchProductsData}
      />
    </>
  );
}
export default ProductCard;
