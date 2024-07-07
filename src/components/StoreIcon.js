import React from 'react';

function StoreIcon({ store, onSelectStore }) {
  return (
    <div className="store-icon" onClick={() => onSelectStore(store.id)}>
      <img src={store.icon} alt={store.name} style={{ width: 100, height: 100 }} />
      <p>{store.name}</p>
    </div>
  );
}

export default StoreIcon;
