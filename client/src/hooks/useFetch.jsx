import { useState,useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
    .then((res) => {
      if(!res.ok){
      throw new Error('failed to fetch!');}
      return res.json();
    })
    .then((data)=> {
      setData(data);
    })
    .catch((err)=> {
      setError(err);
    })
  },[url]);

  return  {data, error};
}
 
export default useFetch;