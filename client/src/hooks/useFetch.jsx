import { useState,useEffect } from "react";

const useFetch = () => {
  const [productData, useProductData] = useState('');
  const [error, useError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/get-data')
    .then((res) => {
      if(!res.ok){
      throw new Error('hello');}
      return res.json();
    })
    .then((data)=> {
      useProductData(data);
    })
    .catch((err)=> {
      useError(err);
    })
  },[]);

  return  {productData, error};
}
 
export default useFetch;