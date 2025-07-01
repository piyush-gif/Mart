import { useEffect, useContext } from "react";
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, fetchCartItems } = useContext(CartContext);

  const itemDeleteHandle = (itemid) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/cart/${itemid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    })
    .then(() => {
      fetchCartItems(); // <-- Refresh both cartItems and cartCount
    })
    .catch(err => {
      console.error(err);
    });
  };

  useEffect(() => {
    fetchCartItems(); 
  }, [fetchCartItems]);

  return ( 
    <div className="cart">
      <div className="item-container">
        {cartItems && 
        cartItems.map((item, id)=> 
          <div key={id} className="items">
            <p>{item.name}</p>
            <p>price: {item.price}</p>
            <p>{item.category}</p>
            <p>{item.expirationDate}</p>
            <p>{item.quantity}</p>
            <button onClick={()=> itemDeleteHandle(item.productId)}>Remove from cart</button>
          </div>
          )  
        }
      </div>
    </div>
   );
}

export default Cart;