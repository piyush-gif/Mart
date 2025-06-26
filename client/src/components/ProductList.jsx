import useFetch from "../hooks/useFetch";

const ProductList = ({category}) => {
  const {productData, error}= useFetch()

  const addToCartHandle = (product) => {
    fetch('http://localhost:8000/add_to_cart',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(product)
    })
    .then(res => {
      if(!res.ok){
        throw new Error('netweork problem');
      }
      return res.json();
    })
    .then((data) => {
      console.log('added to cart', data);
    })
    .catch(err => {
      console.log('ERROR', err)
    })
  }


  return (
    <div className='page-container'>
      <div className='page'>
        {error && <h1>{error.message}</h1>}
        {productData && productData
        .filter(product => product.category === category)
        .map(product => (
          <div key={product._id} className="products">
            <p>{product.name}</p>
            <p>price: {product.price}</p>
            <p>{product.category}</p>
            <p>{new Date(product.expirationDate).toLocaleDateString()}</p>
            <button onClick={() => addToCartHandle(product)}>add to cart</button>
          </div>
          ))}
      </div>
    </div>


    );
}
 
export default ProductList;