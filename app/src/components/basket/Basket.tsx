import * as React from "react";
import BasketItem from "./BasketItem";
import BasketToggle from "./BasketToggle";
import firebase from "../../services/firebase";
import { Boundary, Modal } from "../common";
import { checkoutStep1 } from "../../constants/routes";
import { calculateTotal, displayMoney } from "../../helpers/utils";
import { useDidMount, useModal } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { clearBasket } from "../../redux/actions/basketActions";

const Basket = () => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { basket, user } = useSelector((state) => ({
    basket: state.basket,
    user: state.auth,
  }));
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const didMount = useDidMount();

  React.useEffect(() => {
    if (didMount && basket.length !== 0) {
      firebase.saveBasketItems(basket);
    }
  }, [basket.length]);

  const onCheckOut = () => {
    if (basket.length !== 0 && user) {
      document.body.classList.remove("is-basket-open");
      history.push(checkoutStep1);
    } else {
      onOpenModal();
    }
  };

  const onSignInClick = () => {
    onCloseModal();
    document.body.classList.remove("basket-open");
    history.push(checkoutStep1);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };

  return user && user.role === "ADMIN" ? null : (
    <Boundary>
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <p className="text-center">You must sign in to continue checking out</p>
        <br />
        <div className="d-flex-center">
          <button
            className="button button-border button-border-gray button-small"
            onClick={onCloseModal}
            type="button"
          >
            Continue shopping
          </button>
          &nbsp;
          <button
            className="button button-small"
            onClick={onSignInClick}
            type="button"
          >
            Sign in to checkout
          </button>
        </div>
      </Modal>
      <div className="basket">
        <div className="basket-list">
          <div className="basket-header">
            <h3 className="basket-header-title">
              My Basket &nbsp;
              <span>
                ({` ${basket.length} ${basket.length > 1 ? "items" : "item"}`})
              </span>
            </h3>
            <BasketToggle>
              {({ onClickToggle }) => (
                <span
                  className="basket-toggle button button-border button-border-gray button-small"
                  onClick={onClickToggle}
                  role="presentation"
                >
                  Close
                </span>
              )}
            </BasketToggle>
            <button
              className="basket-clear button button-border button-border-gray button-small"
              disabled={basket.length === 0}
              onClick={onClearBasket}
              type="button"
            >
              <span>Clear Basket</span>
            </button>
          </div>
          {basket.length <= 0 && (
            <div className="basket-empty">
              <h5 className="basket-empty-msg">Your basket is empty</h5>
            </div>
          )}
          {basket.map((product, i) => (
            <BasketItem key={`${product.id}_${i}`} product={product} />
          ))}
        </div>
        <div className="basket-checkout">
          <div className="basket-total">
            <p className="basket-total-title">Subtotal Amout:</p>
            <h2 className="basket-total-amount">
              {displayMoney(
                calculateTotal(
                  basket.map((product) => product.price * product.quantity)
                )
              )}
            </h2>
          </div>
          <button
            className="basket-checkout-button button"
            disabled={basket.length === 0 || pathname === "/checkout"}
            onClick={onCheckOut}
            type="button"
          >
            Check Out
          </button>
        </div>
      </div>
    </Boundary>
  );
};

export default Basket;
