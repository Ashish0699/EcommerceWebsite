import React from 'react'
import './skeletonCss.scss'

const ProductCardSkeleton = () => {
  return (
    <div>
      
      <div className="skeleton-wrapper">
      <div className="skeleton-card">
        <div className="skeleton-image"></div>

        <div className="skeleton-content">
          <div className="skeleton-category"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
      
      
    </div>
    </div>
  )
}

export default ProductCardSkeleton
