import React, { useEffect, useState } from 'react';
import CartLayout from '../layout/CartLayout';
import { useQuery } from '@/services/client';
import { GET_ACTIVE_ORDER } from '@/queries/active-order.query';
import { VendureService } from '@/services/vendure.service';
import { useGlobalContext } from '@/app/store';

interface CartContainerProps { }

const CartContainer: React.FC<CartContainerProps> = () => {
  const { cartItemCount, setCartItemCount } = useGlobalContext();
  const { data, error } = useQuery(GET_ACTIVE_ORDER);

  // Use type assertion to avoid 'never' type error
  const activeOrder = (data as any)?.activeOrder;

  const [cartData, setCartData] = useState(activeOrder);

  const gqService = new VendureService();

  const handleIncrease = async (id: string, quantity: number) => {
    const res: any = await gqService.adjustOrderLine(id, quantity + 1);
    updateCartState(res);
  };

  const handleDecrease = async (id: string, quantity: number) => {
    const res: any = await gqService.adjustOrderLine(id, quantity - 1);
    updateCartState(res);
  };

  const handleDelete = async (id: string) => {
    const res: any = await gqService.removeItemFromOrderMutation(id);
    updateCartState(res);
  };

  const updateCartState = (res: any) => {
    setCartData(res?.adjustOrderLine);
    setCartItemCount(res?.adjustOrderLine?.totalQuantity);
  };

  useEffect(() => {
    if (data) {
      setCartData(activeOrder);
    }
  }, [activeOrder]);

  if (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div>
      {cartData ? (
        <CartLayout
          cartResponse={cartData}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleDelete={handleDelete}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CartContainer;
