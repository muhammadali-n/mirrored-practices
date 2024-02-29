import React, { useState } from 'react'

function Payment({ handlePaymentMethodChange, paymentMethod, payment }: any) {

    return (
        <div className='mt-3'>
            <h2>{payment?.title?.ar}</h2>
            <p>{payment?.description?.ar}</p>
            <form>
                <div >
                    <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'Cash on Delivery (COD)'}
                        onChange={handlePaymentMethodChange}
                        className="form-check-input"
                    />
                    <label htmlFor="cod">{payment?.CODTitle?.ar}</label>
                </div>
            </form>
        </div>
    )
}

export default Payment