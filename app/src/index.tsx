import * as React from "react";
import * as views from "./views";
import * as routes from "./constants/routes";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createInstance, Piral } from "piral-core";
import { Basket } from "./components/basket";
import { Footer, Navigation, Preloader } from "./components/common";
import configureStore from "./redux/store/store";

const { store, persistor } = configureStore();

const AppProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={<Preloader />} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <Basket />
      <main className="content">{children}</main>
      <Footer />
    </>
  );
};

const instance = createInstance({
  state: {
    components: {
      Layout,
    },
    errorComponents: {
      not_found: views.PageNotFound,
    },
    routes: {
      [routes.search]: views.Search,
      [routes.home]: views.Home,
      [routes.shop]: views.Shop,
      [routes.featuredProducts]: views.FeaturedProducts,
      [routes.recommendedProducts]: views.RecommendedProducts,
      [routes.signup]: views.SignUp,
      [routes.signin]: views.SignIn,
      [routes.forgotPassword]: views.ForgotPassword,
      [routes.viewProduct]: views.ViewProduct,
      [routes.account]: views.UserAccount,
      [routes.accountEdit]: views.EditAccount,
      [routes.checkoutStep1]: views.CheckOutStep1,
      [routes.checkoutStep2]: views.CheckOutStep2,
      [routes.checkoutStep3]: views.CheckOutStep3,
      [routes.adminDashboard]: views.Dashboard,
      [routes.adminProducts]: views.Products,
      [routes.addProduct]: views.AddProduct,
      [`${routes.editProduct}/:id`]: views.EditProduct,
    },
    provider: AppProvider,
  },
  requestPilets() {
    return fetch("https://feed.piral.cloud/api/v1/pilet/empty")
      .then((res) => res.json())
      .then((res) => res.items);
  },
});

render(<Piral instance={instance} />, document.querySelector("#app"));
