export const shortenText = (text, n) => {
    if (text.length > n) {
      const shoretenedText = text.substring(0, n).concat("...");
      return shoretenedText;
    }
    return text;
  };

  // Validate email

  export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  
//   export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
//   // Extract id and cart quantity from cartItems
//   export function extractIdAndCartQuantity(products) {
//     return products.map(function (product) {
//       return {
//         _id: product._id,
//         cartQuantity: product.cartQuantity,
//       };
//     });
//   }
  
  export function getCartQuantityById(products, id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === id) {
        return products[i].cartQuantity;
      }
    }
    return 0; // If the _id is not found, return 0 or any default value
  }