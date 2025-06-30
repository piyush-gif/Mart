import {useEffect ,  useState} from "react";
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {

  const [cartItems, setCartItems] = useState(null)
  const { refreshCartCount } = useContext(CartContext);
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
    refreshCartCount();
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemid));
  })
  .catch(err => {
    console.error(err);
  });
}

useEffect(() => {
  const token = localStorage.getItem('token');
  fetch('http://localhost:5000/get-cart-data', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if(!res.ok) throw new Error('no data');
    return res.json();
  })
  .then((data) => {
    setCartItems(data);
  })
  .catch(err =>{
    console.error('error fetching cart', err);
  })
}, [])

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
            <button onClick={()=> itemDeleteHandle(item._id)}>Remove from cart</button>
          </div>
          )  
        }
      </div>
    </div>
   );
}
 
export default Cart;