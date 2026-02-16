/**
 * WOOCOMMERCE CART QUERIES
 */

export const getCartQuery = `
# Obtener carrito actual
query getCart {
  cart {
    contents {
      nodes {
        key
        product {
          node {
            id
            slug
            name
            ... on SimpleProduct {
              price
              image {
                sourceUrl
                altText
              }
            }
          }
        }
        variation {
          node {
            id
            name
            price
          }
        }
        quantity
        subtotal
        total
      }
    }
    subtotal
    total
    shippingTotal
    discountTotal
    feeTotal
  }
}
`;
