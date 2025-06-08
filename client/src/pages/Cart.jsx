import { useActionState, useEffect ,  useState} from "react";

const Cart = () => {

  const [cartItems, setCartItems] = useState(null)

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
  .then(err =>{
    return ('Errpr', err)
  })
}, [])

  return ( 
    <div>
      <div>
        {cartItems && 
        cartItems.map((item, id)=> 
          <div key={id}>
            <p>{item.name}</p>
            <p>price: {item.price}</p>
            <p>{item.category}</p>
            <p>{item.expirationDate}</p>
          </div>
          )  
        }
      </div>
    </div>
   );
}
 
export default Cart;