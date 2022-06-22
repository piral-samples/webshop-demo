import * as React from 'react';

const UserTab = (props) => {
  const { children } = props;
  const [activeTab, setActiveTab] = React.useState(children[0].props.index || 0);
  
  return (
    <div className="user-tab">
      <div className="user-tab-nav">
        <ul className="user-tab-menu">
          {children.map((child) => (
            <li
              className={`user-tab-item ${child.props.index === activeTab ? 'user-tab-active' : ''}`}
              key={child.props.label}
              role="presentation"
              onClick={() => setActiveTab(child.props.index)}
            >
              {child.props.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="user-tab-content">
        {children.map((child) => {
          if (child.props.index !== activeTab) return null;

          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default UserTab;
