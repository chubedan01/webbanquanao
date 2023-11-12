

import React,{useState,useEffect} from 'react'
//import "../styles/backround.css"
import "../styles/home.css"
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'
import {Container,Row,Col } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import heroImg from '../assets/images/hero-img.png'

import Services from "../services/services"
import ProductsList from '../components/IU/ProductList'


import Clock from '../components/IU/Clock'
import counterImg from '../assets/images/counter-timer-img.png'

import useGetData from '../custom-hooks/useGetData'


const Home = () => {
  
  const {data: products, loading} = useGetData('products')
  
  const [trendingProducts,setTrendingProducts]= useState([]);
  const [bestSalesProducts,setBestSalesProducts]= useState([]);
  const [quanauProducts, setQuanauProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();
  //console.log(products)
/**
 * Nó lọc mảng "products" để tạo hai mảng mới: "filteredtrendingproducts" chứa các mục có danh mục "ghế" và "filteredbestsaleproducts" chứa các mục có danh mục "sofa"
 */
 useEffect(() => {
  if (products) {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "giaytay"
    );
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "aosomi"
    );
    const filteredQuanauProducts = products.filter(
      (item) => item.category === "quanau"
    );
    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );
    const filteredPopularProducts = products.filter(
      (item) => item.category === "thatlung"
    );
   


    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setQuanauProducts(filteredQuanauProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }
}, [products]);

useEffect(() => {
  
}, [trendingProducts]);







  return (
  <Helmet title={"Home"}>

  <section className="hero_section">
    <Container>
    <Row>
      <Col lg='6' md='6'>{/*chiếm 6 trong số 12 cột trên màn hình lớn và `col-md-6` chỉ định tương tự cho màn hình cỡ trung bình*/ }
        <div className="hero_content">
          <p className="hero_subtitle">
            Phong cách thời trang văn phòng nam năm {year}
          </p>
          <h2>
            THỜI TRANG CÔNG SỞ DÀNH CHO NAM "LỊCH THIỆP & THOÃI MÁI"
          </h2>
          <p className="slogan">Nơi bán quần áo khiến bạn trông có gu hơn<nav></nav></p>
          <motion.button whileTap={{scale: 1.2}} className="buy_btn"><Link to='shop'>SHOP NOW</Link></motion.button>
        </div>
      </Col>
      <Col lg="6" md="6">
        <div className="hero_img">
          <img src={heroImg} alt="hero_img" />
        </div>
      </Col>
     </Row>
    </Container>
  </section>

    <Services />

    <section className="trending_product">
  <Container>
    <Row>
      <Col lg="12" className="section_title text-center">
        <h2 className="section_title fw-600">Trending Products</h2>
      </Col>
      {loading ? (
        <h5 className="fw-bold">Loading....</h5>
      ) : trendingProducts && trendingProducts.length > 0 ? (
        <ProductsList data={trendingProducts}/>
      ) : (
        <h5 className="fw-bold text-center">No trending products available.</h5>
      )}
    </Row>
  </Container>
</section>

<section className="best_sales">
  <Container>
    <Row>
      <Col lg="12" className="text-center">
        <h2 className="section_title ">Best Sale</h2>
      </Col>
      {loading ? (
        <h5 className="fw-bold">Loading....</h5>
      ) : bestSalesProducts && bestSalesProducts.length > 0 ? (
        <ProductsList data={bestSalesProducts} />
      ) : (
        <h5 className="fw-bold text-center">No best sale products available.</h5>
      )}
    </Row>
  </Container>
</section>
    
    <section className="timer_count">
      <Container>
        <Row className='count_down-col'>
          <Col className="count_down-col">
            <div className="clock_top-content">
              <h4 className="text-white fs-6 mb-2"> Limtited Offers</h4>
              <h3 className="text-white fs-5 mb-3"> Quality ArmGiaytay</h3>
            </div>

           <Clock/> { /**dong ho dem nguoc */}

            <motion.button whileTap={{scale:1.2}} className="buy_btn store_btn">
              <Link to="/shop">VISIT STORE</Link>
            </motion.button>

          </Col>
          <Col lg='6' md='12' className='text-end counter_img'>
          <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>


    <section className="new_arrivals">
    <Container>
      <Row>
        <Col lg="12" className="text-center mb-3">
        <h2 className="section_title">New Arrivals</h2>
        </Col>
        {loading ? (
    <h5 className='fw-bold'>Loading....</h5>
  ) : quanauProducts && quanauProducts.length > 0 ? (
    <ProductsList data={quanauProducts} />
  ) : (
    <h5 className='fw-bold text-center'>No products available.</h5>
  )}
         {loading ? (
    <h5 className='fw-bold'>Loading....</h5>
  ) : wirelessProducts && wirelessProducts.length > 0 ? (
    <ProductsList data={wirelessProducts} />
  ) : (
    <h5 className='fw-bold text-center'>No products available.</h5>
  )}
      </Row>
    </Container>
    </section>

    <section className="popular_category">
    <Container>
      <Row>
        <Col lg="12" className="text-center mb-5">
        <h2 className="section_title mb-3">Popular in Category</h2>
        </Col>
        {loading ? (
    <h5 className='fw-bold'>Loading....</h5>
  ) : popularProducts && popularProducts.length > 0 ? (
    <ProductsList data={popularProducts} />
  ) : (
    <h5 className='fw-bold text-center'>No products available.</h5>
  )}
      </Row>
    </Container>
    </section>
  
  </Helmet>
  ); 
};

export default Home;