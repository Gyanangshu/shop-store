import React, { children, createContext } from 'react';
import { useEffect } from 'react';

// export context 
export const CartContext = createContext();

const CartProvider = ({children}) => {

  // cart state 
  const [cart, setCart] = React.useState([]);

  // item amount state 
  const [itemAmount, setItemAmount] = React.useState(0);
  
  // total price state 
  const [total, setTotal] = React.useState(0);



  // update total cart amount 
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0)
    setTotal(total);
  })

  // update item amount 
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // add to cart 
  const addToCart = (product, id) => {
    const newItem = {...product, amount:1 };
    // console.log(newItem)

    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    // check if the item is already in the cart 
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount + 1};
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }

    // console.log(product)
    // console.log(`${product.title} added to the cart`)
  };
  // console.log(cart)

  // remove from cart 
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    })
    setCart(newCart)
  }

  // clear cart items
  const clearCart = () => {
    setCart([])
  }

  // increase amount 
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id)
    // console.log(item)
    // console.log(`item ${id} amount increased`)
    addToCart(cartItem, id);
  }

   // decrease amount 
   const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount - 1}
        } else {
          return item;
        }
      });
      setCart(newCart);
    } 
    if (cartItem.amount < 2) {
        removeFromCart(id)
    }
   };

  return (
  <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total}}>
    {children}
    </CartContext.Provider>
    );
};

export default CartProvider;
