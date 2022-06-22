import * as React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from '../../../hooks';
import UserTab from '../components/UserTab';

const UserAccountTab = React.lazy(() => import('../components/UserAccountTab'));
const UserWishListTab = React.lazy(() => import('../components/UserWishListTab'));
const UserOrdersTab = React.lazy(() => import('../components/UserOrdersTab'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount = () => {
  useScrollTop();
  useDocumentTitle('My Account | Lunetas-cam');

  return (
    <UserTab>
      <div index={0} label="Account">
        <React.Suspense fallback={<Loader />}>
          <UserAccountTab />
        </React.Suspense>
      </div>
      <div index={1} label="My Wish List">
        <React.Suspense fallback={<Loader />}>
          <UserWishListTab />
        </React.Suspense>
      </div>
      <div index={2} label="My Orders">
        <React.Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </React.Suspense>
      </div>
    </UserTab>
  );
};

export default UserAccount;
