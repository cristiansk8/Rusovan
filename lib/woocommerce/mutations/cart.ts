/**
 * WOOCOMMERCE CART MUTATIONS
 */

export const addToCartMutation = `
# Agregar producto al carrito (Simple Product)
mutation addToCart($productId: Int!, $quantity: Int) {
  addToCart(input: {
    productId: $productId
    quantity: $quantity
  }) {
    cart {
      subtotal
      total
    }
    success
    error
  }
}
`;

export const updateCartItemMutation = `
# Actualizar items del carrito
mutation updateCartItems($items: [CartItemInput!]!) {
  updateCartItems(input: {
    items: $items
  }) {
    cart {
      contents {
        nodes {
          key
          quantity
          product {
            node {
              id
              name
            }
          }
        }
      }
      subtotal
      total
    }
    success
    error
  }
}
`;
