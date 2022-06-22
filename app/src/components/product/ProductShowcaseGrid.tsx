import { FeaturedProduct } from '../../components/product';
import * as React from 'react';

const ProductShowcase = ({ products, skeletonCount = 4 }) => (
  <div className="product-display-grid">
    {(products.length === 0) ? new Array(skeletonCount).fill({}).map((product, index) => (
      <FeaturedProduct
        key={`product-skeleton ${index}`}
        product={product}
      />
    )) : products.map((product) => (
      <FeaturedProduct
        key={product.id}
        product={product}
      />
    ))}
  </div>
);

export default ProductShowcase;
