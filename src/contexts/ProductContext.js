import React, {createContext} from 'react';

// create context 
export const ProductContext = createContext();

const ProductProvider = ({children}) => {

  // products state 
  const [products, setProducts] = React.useState([]);

  // fetch products 
  React.useEffect(() => {
    const fetchProducts = async ()=> {
      const response  = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      // console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, [])


  return <ProductContext.Provider value={{products}}>
    {children}
  </ProductContext.Provider>;
};

export default ProductProvider;
