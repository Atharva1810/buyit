import { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
// Components
import Message from "../components/Message";
// Actions
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  // For optional params like /api/products/:id
  const params = useParams();
  // For navigating and redirecting between pages of our app
  const navigate = useNavigate();
  // For query string params
  const [queryParams] = useSearchParams();

  const productId = params.id;
  const qty = queryParams.get("qty") ? parseInt(queryParams.get("qty")) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Container className="py-3">
      <Row>
        <Col md={8}>
          <h1>Shopping cart</h1>
          {cartItems.length == 0 ? (
            <Message>
              Your cart is empty! <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(item.product, parseInt(e.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          removeFromCartHandler(item.product);
                        }}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flus">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, currItem) => acc + currItem.qty, 0)})
                  items
                </h2>
                $
                {cartItems
                  .reduce(
                    (acc, currItem) => acc + currItem.qty * currItem.price,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
