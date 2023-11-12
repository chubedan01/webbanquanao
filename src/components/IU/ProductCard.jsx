import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slicse/cartSlice';
import useGetData from "../../custom-hooks/useGetData"
import { Col } from "reactstrap";
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import {useNavigate } from 'react-router-dom';



const ProductCard = ({ productId }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const {data: data, loading } = useGetData('products');
  const naviate = useNavigate();

  const navigateOderdetail =()=>{
    naviate(`/shop/${product.id}`)
  }

  // Function to add the product to the cart
  const addTocart = () => {
    if (product) {
      dispatch(
        cartActions.addItem({
          id: product.id,
          productsName: product.productsName,
          category:product.category,
          price: product.price,
          imgUrl: product.imgUrl,
        })
      );
      toast.success('Product added successfully');
    } else {
      toast.error('Product not found');
    }
  };

  useEffect(() => {
    if (!loading && data && productId) {
      const foundProduct = data.find((item) => item.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [data, loading, productId]);

  // function  formatCurrency(amount) {
  //   return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(amount);
  // }

  return (
    <Col lg="3" md="6" sm="12" className="mb-2">
      {
        <div className="product_item">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <>
            <div className="product_img" onClick={() => navigateOderdetail()}>
              <motion.img
                whileHover={{ scale: 0.9 }}
                src={product.imgUrl}
                alt=""
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="p-2 product_info">
              <h3 className="product_name">
                <Link to={`/shop/${product.id}`}>{product.productsName}</Link>
              </h3>
              <span>{product.category}</span>
            </div>
            <div className="product_card-bottom d-flex align-items-center justify-content-between p-2">
              <span className="price">${product.price}</span>
              <motion.span whileTap={{ scale: 1.2 }} onClick={addTocart}>
                <i className="ri-add-circle-line"></i>
              </motion.span>
            </div>
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>

      }
      
    </Col>
  );
};

export default ProductCard;
