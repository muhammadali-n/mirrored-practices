import React from 'react'

import { useRouter } from 'next/router'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import { KiboDialog } from '@/components/common'
import Actions from '@/components/dialogs/AddToCartConfirmation/Actions/Actions'
import Content from '@/components/dialogs/AddToCartConfirmation/Content/Content'
import Title from '@/components/dialogs/AddToCartConfirmation/Title/Title'

import type { CrCartItem as CartItemType } from '@/lib/gql/types'

interface CartDetailsProps {
  cartItem: CartItemType
  isDialogCentered: boolean
  closeModal: () => void
}

// Component
const AddToCartDialog = (props: CartDetailsProps) => {
  const { cartItem, closeModal, isDialogCentered } = props
  const contentArgs = {
    cartItem,
  }

  const router = useRouter()

  const handleGoToCart = () => {
    router.push('/cart')
    closeModal()
  }
  const handleContinueShopping = () => {
    closeModal()
  }

  const DialogArgs = {
    Title: <Title />,
    Content: <Content {...contentArgs} />,
    showContentTopDivider: true,
    showContentBottomDivider: false,
    Actions: <Actions onGoToCart={handleGoToCart} onContinueShopping={handleContinueShopping} />,
    isDialogCentered: isDialogCentered,
    customMaxWidth: '32.375rem',
    onClose: () => closeModal(),
  }

  return (
    <Modal
      isOpen={true}
      toggle={closeModal}
      className="modal-custom mini-basket"
      size="lg"
      centered
    >
      <ModalHeader>Added to basket</ModalHeader>
      <ModalBody className="scrollbar">
        <div className="mini-basket-item bg-green-tint">
          <div className="mini-product-cart">
            <div className="mini-product-cart-item item-checked">
              <figure>
                <img src="/images/tru/thumbs/1208697_101.jpg" alt="" />
              </figure>
              <div className="mini-product-data">
                <h5>1x added</h5>
                <p>{"Disney Frozen Little Kingdom Elsa's Magical Snow Maker"}</p>
              </div>
              <div className="mini-product-option i-svg-installation">
                Professional assembly added
              </div>
              <div className="mini-product-option i-svg-gift">Professional assembly added</div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="white" onClick={handleContinueShopping}>
          Continue shopping
        </Button>
        <Button color="success" onClick={handleGoToCart}>
          Go to Basket
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default AddToCartDialog
