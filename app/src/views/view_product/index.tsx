import * as React from "react";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  ColorChooser,
  ImageLoader,
  MessageDisplay,
} from "../../components/common";
import { ProductShowcaseGrid } from "../../components/product";
import { recommendedProducts, shop } from "../../constants/routes";
import { displayMoney } from "../../helpers/utils";
import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useRecommendedProducts,
  useScrollTop,
} from "../../hooks";

const ViewProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket();
  useScrollTop();
  useDocumentTitle(`View ${product?.name || "Item"}`);

  const [selectedImage, setSelectedImage] = React.useState(
    product?.image || ""
  );
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");

  const {
    recommendedProducts: recommendedProductItems,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useRecommendedProducts(6);
  const colorOverlay = React.useRef(null);

  React.useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToBasket = () => {
    addToBasket({
      ...product,
      selectedColor,
      selectedSize: selectedSize || product.sizes[0],
    });
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: "3rem" }} />
        </div>
      )}
      {error && <MessageDisplay message={error} />}
      {product && !isLoading && (
        <div className="product-view">
          <Link to={shop}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Back to shop
            </h3>
          </Link>
          <div className="product-modal">
            {product.imageCollection.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.imageCollection.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && (
                <input
                  type="color"
                  disabled
                  ref={colorOverlay}
                  id="color-overlay"
                />
              )}
              <ImageLoader
                alt={product.name}
                className="product-modal-image"
                src={selectedImage}
              />
            </div>
            <div className="product-modal-details">
              <br />
              <span className="text-subtle">{product.brand}</span>
              <h1 className="margin-top-0">{product.name}</h1>
              <span>{product.description}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              <div>
                <span className="text-subtle">Lens Width and Frame Size</span>
                <br />
                <br />
                <Select
                  placeholder="--Select Size--"
                  onChange={onSelectedSizeChange}
                  options={product.sizes
                    .sort((a, b) => (a < b ? -1 : 1))
                    .map((size) => ({ label: `${size} mm`, value: size }))}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div>
              <br />
              {product.availableColors.length >= 1 && (
                <div>
                  <span className="text-subtle">Choose Color</span>
                  <br />
                  <br />
                  <ColorChooser
                    availableColors={product.availableColors}
                    onSelectedColorChange={onSelectedColorChange}
                  />
                </div>
              )}
              <h1>{displayMoney(product.price)}</h1>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${
                    isItemOnBasket(product.id)
                      ? "button-border button-border-gray"
                      : ""
                  }`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                  {isItemOnBasket(product.id)
                    ? "Remove From Basket"
                    : "Add To Basket"}
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "10rem" }}>
            <div className="display-header">
              <h1>Recommended</h1>
              <Link to={recommendedProducts}>See All</Link>
            </div>
            {errorFeatured && !isLoadingFeatured ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={recommendedProductItems}
                skeletonCount={3}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
