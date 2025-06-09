import {useEffect ,  useState} from "react";

const Cart = () => {

  const [cartItems, setCartItems] = useState(null)

  const itemDeleteHandle = (itemid) => {
    fetch(`http://localhost:8000/cart/${itemid}`, {
    method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    })
    .then(data => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemid));
    })
    .catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    fetch('http://localhost:8000/cart',{})
  .then((res) => {
    if(!res.ok) throw new Error('no data');
    return res.json();
  })
  .then((data) => {
  setCartItems(data.cart);
  console.log(data);
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
            <button onClick={()=> itemDeleteHandle(item.id)}>Remove from cart</button>
          </div>
          )  
        }
      </div>
    </div>
   );
}
 
export default Cart;