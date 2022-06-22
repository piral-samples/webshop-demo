import * as React from "react";

const BasketToggle = ({ children }) => {
  const onClickToggle = () => {
    if (document.body.classList.contains("is-basket-open")) {
      document.body.classList.remove("is-basket-open");
    } else {
      document.body.classList.add("is-basket-open");
    }
  };

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLDivElement;
    const closest = target.closest(".basket");
    const toggle = target.closest(".basket-toggle");
    const closeToggle = target.closest(".basket-item-remove");

    if (
      !closest &&
      document.body.classList.contains("is-basket-open") &&
      !toggle &&
      !closeToggle
    ) {
      document.body.classList.remove("is-basket-open");
    }
  });

  return <>{children({ onClickToggle })}</>;
};

export default BasketToggle;
