import { useEffect } from "react";
import { Col, Container, Row ,Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/Navbar";

import {
  addToCart,
  decreaseQty,
  deleteProduct,
  emptyCart
} from "../app/features/cart/cartSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);
  return (
    <>
     <NavBar />
 
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice}.00</h3>
              </div>
              <Button variant="primary" type="submit" className="btn-block" 
              onClick={()=>{
              toast.success('Order Placed !!!');
               navigate("/home") 
               dispatch(emptyCart())
               
               }}
               style={{width:'100%'}}
               > Check Out </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Footer></Footer>
    </>
  );
};

export default Cart;
