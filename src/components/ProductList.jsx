import useFetch from "../hooks/useFetch";

const ProductList = ({category}) => {
  const {productData, error}= useFetch()
  return (
    <div className='page-container'>
      <div className='page'>
        {error && <h1>{error.message}</h1>}
        {productData && productData
        .filter(product => product.category === category)
        .map(product => (
          <div key={product.id} className="products">
            <h3>{product.id}</h3>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>{product.expirationDate}</p>
            <hr/>
          </div>
          ))}
      </div>
    </div>


    );
}
 
export default ProductList;