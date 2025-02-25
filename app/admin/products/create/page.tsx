import React from 'react'
import { Metadata } from 'next'
import ProductForm from './product-form'

export const metadata : Metadata = {
    title: 'Create Product',
    description: 'Create a new product',
}
const CreateProductPage = () => {
  return (
    <div>
        <h2 className='h2-bold'>Create product</h2>
        <div className='my-8'>
            <ProductForm
                type="Create"

            />
        </div>
    </div>
  )
}

export default CreateProductPage