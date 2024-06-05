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
  
  export function getCartQuantityById(products, id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === id) {
        return products[i].cartQuantity;
      }
    }
    return 0; // If the _id is not found, return 0 or any default value
  }