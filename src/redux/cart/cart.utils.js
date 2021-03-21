export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? {...cartItem, quanity: cartItem.quanity +1 }
            : cartItem
        )
    }

    return [...cartItems, {...cartItemToAdd, quanity: 1}]
}