import * as React from 'react';
import { Boundary } from '../../../components/common';
import { AppliedFilters, ProductList } from '../../../components/product';
import { useDocumentTitle, useScrollTop } from '../../../hooks';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from '../../../selectors/selector';
import { ProductsNavbar } from '../components';
import ProductsTable from '../components/ProductsTable';

const Products: React.FC<any> = () => {
  useDocumentTitle('Product List | Lunetas-cam Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products
  }));

  return (
    <Boundary>
      <ProductsNavbar
        productsCount={store.products.items.length}
        totalProductsCount={store.products.total}
      />
      <div className="product-admin-items">
        <ProductList {...store}>
          <AppliedFilters />
          <ProductsTable filteredProducts={store.filteredProducts} />
        </ProductList>
      </div>
    </Boundary>
  );
};

export default withRouter(Products);
