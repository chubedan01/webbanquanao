// trang chi tiet san pham
//hook `useParams` được sử dụng để truy cập các tham số động từ URL.

import React,{useState,useRef,useEffect} from 'react'


import { Container,Row,Col } from 'reactstrap'
import { useParams } from 'react-router-dom'//cho phép bạn truy cập các tham số từ tuyến đường hiện tại

import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/IU/CommonSection'
import "../styles/product-details.css"
import { motion } from 'framer-motion'
import ProductList from '../components/IU/ProductList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slicse/cartSlice'
import { toast } from 'react-toastify'

import {db} from '../firebase.config'
import {doc, getDoc} from 'firebase/firestore'
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'
import { async } from '@firebase/util'
import useGetData from '../custom-hooks/useGetData'
const ProductDetails = () => {
  
  const [product, setProduct] =useState({})
  const [tab, setTab] = useState('desc')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const dispatch = useDispatch()

  const [rating, setRating]= useState(null)
  const {id} =useParams()
  const {data: products} = useGetData('products')
  //const product =products.find(item=> item.id===id)



  const docRef = doc(db, 'products' , id)
  useEffect(() =>{
    const getProduct = async() =>{
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setProduct(docSnap.data())

      } else{
        console.log('no product!')
      }
    }
    getProduct()
  },[])

  const {
    imgUrl,
    productsName, 
    price, 
    //avgRating, 
    //reviews,
    description,
    shortDesc,
    category,
  }= product;

  const leatedProducts = products.filter(item=> item.category===category);
  const submitHandler = (e) =>{
    e.preventDefault();

    const reviewuserName = reviewUser.current.value
    const reviewuserMsg = reviewMsg.current.value
    const reviewObj ={
      userName: reviewuserName,
      text: reviewuserMsg
    }


    toast.success('submit a comment')

  };



  const addToCart = () =>{
    dispatch(cartActions.addItem({
      id,
      imgUrl:imgUrl,
      productsName,
      price,

    })
    );

    toast.success('Product added successfully')
  };

useEffect(()=>{
  window.scroll(0,0)
},[product]
)

// function  formatCurrency(amount) {
//   return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(amount);
// }

  return (
    <Helmet title={productsName}>
    <CommonSection title={productsName}/>
  
      <section className="pt-0">
  
      <Container>
        <Row>
          <Col lg="6">
            <img src={imgUrl} alt="" style={{ width: '100%', height: 'auto' }} />
          </Col>
          <Col lg="6">
           <div className="product_details">
             <h2>{productsName}</h2>
             <div className="product_rating d-flex align-item-center
             gap-5 mb-3">
              <div>
                <span>
                  <i class="ri-star-s-fill"></i>
                </span>
                <span>
                  <i class="ri-star-s-fill"></i>
                </span>
                <span >
                  <i class="ri-star-s-fill"></i>
                </span>
                <span >
                  <i class="ri-star-s-fill"></i>
                </span>
                <span >
                  <i class="ri-star-half-s-line"></i>
                </span>
              </div>

              <p>
                {/* (<span>{avgRating}</span> ratings) */}
              </p>

             </div>
             {/** gia tien va  */}
            <div className='d-flex align-items-center gap-5'>
              <span className="product_price">${price}</span>
              <span>Category: {category}</span>
            </div>
             <p className='mt-3'>{shortDesc}</p>

             <motion.button whileTap={{scale:1.2}} 
             className='buy_btn mt-2'onClick={addToCart}> 
            Thêm vào giỏ hàng
             </motion.button>
           </div>
           <div className="tab_wrapper mt-3 d-flex align-items-center
              gap-5">
              <h6 className={`${tab==="desc"? "active_tab" : ""}`}
              onClick={()=> setTab("desc")} 
              >Thông tin chi tiết sản phẩm:
              </h6>
             
              <h6 className={`${tab==="rev"? "active_tab" : ""}`}
              onClick={()=> setTab("rev")} 
              >
                {/* Reviews ({reviews.length}) */}
              </h6>
              </div>
              <p className='thontinsanpham'>{description}</p>
          </Col>
  
        </Row>
      </Container>
  
      </section>
      
      <section>
        <Container>
          <Row>
            <Col lg='12'>
          
              {
                tab==="desc"?(
                <div className="tab_content mt-4">
                
                </div>):
                (<div className="product_review">
                  <div className="review_wrapper">
                    {/* <ul>
                      {
                        reviews?.map((item,index)=>(
                          <li kew={index}>
                          <h6> Jhon doe</h6>
                          <span>{item.rating}(rating)</span>
                          <p>{item.text}</p>
                          </li>
                        ))
                      }
                    </ul> */}


                    {/** danh gia cua khach hang */}
                    <div className="review_form">
                      <h4> Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="review_form">
                          <input type="text" 
                          placeholder='enter your name' 
                          ref={reviewUser}
                          required/>
                        </div>

                        <div className="form_group d-flex align-items-center gap-5 rating_group">
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(1)}>
                            1<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(2)}>
                            2<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(3)}>
                            3<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(4)}>
                            4<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(5)}>
                            5<i class="ri-star-s-fill"></i></motion.span>
                        </div>
                        <div className="review_form">
                          <textarea
                          ref={reviewMsg}
                          rows={4} type="text" 
                          placeholder='Review Message..' 
                          required/>
                        </div>
                        <button type='submit' className='buy_btn'>submit</button>
                      </form>
                    </div>
                  </div>
                </div>)

              }
              
            </Col>
            {/** đề xuất những sản phẩm bạn có thể thích */}
            <Col lg="12" className='related_title'>
            <h2 className="ralated"> You might also like</h2></Col>
            <ProductList data={leatedProducts}></ProductList>
          </Row>
        </Container>
      </section>
      
  </Helmet>
  )
  
};
export default ProductDetails


