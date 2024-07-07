import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import './storeStyles/store2.css';

function importStoreCSS(storeId) {
  switch(storeId) {
    case '1':
      import('./storeStyles/store1.css');
      break;
    case '2':
      import('./storeStyles/store2.css');
      break;
    case '3':
      import('./storeStyles/store3.css');
      break;
    case '4':
      import('./storeStyles/store4.css');
      break;
    case '5':
      import('./storeStyles/store5.css');
      break;
    default:
      import('./storeStyles/store2.css');
  }
}

function StorePage() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [buttonText, setButtonText] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the useCart hook

  useEffect(() => {
    importStoreCSS(storeId);
    
    const fetchStoreData = async () => {
      try {
        const storeResponse = await api.get(`/stores/${storeId}`);
        const itemsResponse = await api.get(`/stores/${storeId}/items`);
        
        const storeData = storeResponse.data;
        const itemsData = itemsResponse.data;

        const initialQuantities = itemsData.reduce((acc, item) => {
          acc[item.id] = 0; // Initialize quantities to 0
          return acc;
        }, {});

        const initialButtonText = itemsData.reduce((acc, item) => {
          acc[item.id] = "加入购物车"; // Initialize button text
          return acc;
        }, {});

        setStore(storeData);
        setItems(itemsData);
        setQuantities(initialQuantities);
        setButtonText(initialButtonText);
      } catch (error) {
        console.error('Error fetching store data:', error.response ? error.response.data : error.message);
      }
    };

    fetchStoreData();
  }, [storeId]);

  const incrementQuantity = (itemId) => {
    setQuantities({
      ...quantities,
      [itemId]: quantities[itemId] + 1,
    });
  };

  const decrementQuantity = (itemId) => {
    setQuantities({
      ...quantities,
      [itemId]: Math.max(0, quantities[itemId] - 1), // Ensure quantity doesn't go below 0
    });
  };

  const handleAddToCart = (item) => {
    if (quantities[item.id] > 0) {
      addToCart({ ...item, quantity: quantities[item.id], storeName: store.name, storeId: store.id });

      // Change button text to "成功"
      setButtonText(prevButtonText => ({
        ...prevButtonText,
        [item.id]: "成功"
      }));

      // Change button text back to "加入购物车" after 1.5 seconds
      setTimeout(() => {
        setButtonText(prevButtonText => ({
          ...prevButtonText,
          [item.id]: "加入购物车"
        }));
      }, 2000);
    } else {
      alert("Please select at least one item to add to cart.");
    }
  };

  if (!store) {
    return <div>加载...</div>;
  }

  const itemsWithImages = items.filter(item => item.image);
  const itemsWithoutImages = items.filter(item => !item.image);

  return (
    <div className={`store-page store-${storeId} page-container`}>
      <div className="store-header">
        <div className="store-header-content">
          {store.icon ? (
            <>
              <img src={`/images/${store.icon}`} alt={store.name || 'Store'} className="store-icon" />
              <h1>{store.name || 'Store Name'}</h1>
              <img src={`/images/${store.icon}`} alt={store.name || 'Store'} className="store-icon" />
            </>
          ) : (
            <h1>{store.name || 'Store Name'}</h1>
          )}
        </div>
        <div className="store-header-buttons-container">
          <div className="store-header-buttons">
            <button onClick={() => navigate(`/store/${storeId}/details`)}>商店信息</button>
            <button onClick={() => navigate(`/store/${storeId}/cart`)}>购物车</button>
          </div>
        </div>
      </div>
      <div className="store-items">
        <div className="store-items-container">
          <div className="store-items-with-images">
            {itemsWithImages.map(item => (
              <div key={item.id} className="store-item">
                <Link to={`/store/${storeId}/item/${item.id}`} className="store-item-link">
                  <img src={`/images/${item.image}`} alt={item.name} className="store-item-image" onError={(e) => { e.target.style.display = 'none'; }} />
                </Link>
                <h3 className="store-item-name">{item.name}</h3>
                <p className="store-item-description">{item.description}</p>
                <p className="store-item-price">{item.price} 元</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{quantities[item.id]}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
                  {buttonText[item.id]}
                </button>
              </div>
            ))}
          </div>
          {itemsWithoutImages.length > 0 && (
            <div className="store-items-without-images">
              <table className="store-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Add to Cart</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsWithoutImages.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.weight}</td>
                      <td>{item.price} 元</td>
                      <td>
                        <div className="quantity-controls">
                          <button onClick={() => decrementQuantity(item.id)}>-</button>
                          <span>{quantities[item.id]}</span>
                          <button onClick={() => incrementQuantity(item.id)}>+</button>
                        </div>
                      </td>
                      <td>
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
                          {buttonText[item.id]}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StorePage;
