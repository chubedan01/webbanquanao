import React from 'react';
import ProductCard from './ProductCard';
import useGetData from '../../custom-hooks/useGetData';

const ProductList = ({ data }) => {
  const { loading } = useGetData('products'); // Fetch products data from Firebase

  return (
    <>
      {loading ? (
        <p> Loading...</p>
      ) : data && data.length > 0 ? (
        data.map((product, index) => (
          <ProductCard key={index} productId={product.id} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </>
  );
};

export default ProductList;