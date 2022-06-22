import * as React from 'react';

const Badge = ({ count, children }) => (
  <div className="badge">
    {children}
    {count >= 1 && <span className="badge-count">{count}</span>}
  </div>
);

export default Badge;
