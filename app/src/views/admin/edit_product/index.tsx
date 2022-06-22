import * as React from "react";
import { useDispatch } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useDocumentTitle, useProduct, useScrollTop } from "../../../hooks";
import { editProduct } from "../../../redux/actions/productActions";

const ProductForm = React.lazy(() => import("../components/ProductForm"));

const EditProduct: React.FC<any> = ({ match }) => {
  useDocumentTitle("Edit Product | Lunetas-cam");
  useScrollTop();
  const { product, error, isLoading } = useProduct(match.params.id);
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    dispatch(editProduct(product.id, updates));
  };

  return (
    <div className="product-form-container">
      {error && <Redirect to="/dashboard/products" />}
      <h2>Edit Product</h2>
      {product && (
        <React.Suspense
          fallback={
            <div className="loader" style={{ minHeight: "80vh" }}>
              <h6>Loading ... </h6>
              <br />
              <LoadingOutlined />
            </div>
          }
        >
          <ProductForm
            isLoading={isLoading}
            onSubmit={onSubmitForm}
            product={product}
          />
        </React.Suspense>
      )}
    </div>
  );
};

export default withRouter(EditProduct);
