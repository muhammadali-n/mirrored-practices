import { addToCart, createCart, getCart, removeFromCart, updateCart } from "@/integrations/shopify/shopify-integration";
import { TAGS } from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { getCookie, setCookie } from "@/utils/cookieUtils";

export async function addItem(selectedVariantId: string | undefined) {
  try {
    let cartId = getCookie('cartId');
    let cart;

    console.log("cartId", cartId);

    if (!cartId) {
      cart = await createCart();
      cartId = cart.id;
      setCookie('cartId', cartId, 30 * 24 * 60 * 60); 
    } else {
      cart = await getCart(cartId);
    }

    if (!cartId || !cart) {
      return 'Error creating or retrieving cart';
    }

    if (!selectedVariantId) {
      return 'Missing product variant ID';
    }
    console.log("&&&&&&&&&&&&&&&&&&&");
    
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);

    return 'Item added to cart successfully';



  } catch (e) {
    console.error('Error adding item to cart:', e);
    return 'Error adding item to cart';
  }
}

export async function removeItem( lineId: string) {
  let cartId = getCookie('cartId');

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
) {
  const cartId = getCookie('cartId')

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error updating item quantity';
  }
}