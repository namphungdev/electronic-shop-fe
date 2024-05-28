import { PATH } from '@/config'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductManagement = () => {
    const navigate = useNavigate()
  return (
    <>
    <div>ProductManagement</div>
    <button onClick={() => navigate(PATH.productsAddCMS)}>Add</button>
    </>

  )
}

export default ProductManagement