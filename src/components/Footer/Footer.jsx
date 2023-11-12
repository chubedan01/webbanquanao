import React from 'react';
import './footer.css';
import logo from '../../assets/images/logo.png';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
const Footer = () => {
  const year=new Date().getFullYear();
  return <footer className="footer">
    <Container>
      <Row>
        <Col lg="4">

        <div className="nav__wrapper">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h1 className='Multmart'>Men's office fashion</h1>
          </div>
        </div>
        <p className="footer_text mt-3">
        Phong cách thời trang văn phòng nam năm 2023

THỜI TRANG CÔNG SỞ DÀNH CHO NAM "LỊCH THIỆP & THOÃI MÁI"
Nơi bán quần áo khiến bạn trông có gu hơn
        </p>
        </Col>

        <Col lg="3">
          <div className="footer_quick-links">
            <h4 className="quick_links-title"> Top bán chạy</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 broder-0 d-flex
              align-items-center gap-2">
                <Link to='#'>Giày tây</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 broder-0">
                <Link to='#'>Áo sơ mi</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 broder-0">
                <Link to='#'>Thắt lưng</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg="2">
        <div className="footer_quick-links">
            <h4 className="quick_links-title">Truy cập nhanh</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 broder-0">
                <Link to="/shop">Shop</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 broder-0">
                <Link to="/cart">Cart</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 broder-0">
                <Link to="/login">Login</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 broder-0">
                <Link to="#"></Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg="3">
        <div className="footer_quick-links">
            <h4 className="quick_links-title">Contact</h4>
            <ListGroup className="footer_contact">
              <ListGroupItem className="ps-0 broder-0 d-flex 
              align-items-center gap-2">
                <span><i class="ri-map-pin-line"></i></span>
                <p>4M/1,P.Xuan Khanh,Q.Ninh Kieu,TP.Can Tho</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 broder-0 d-flex 
              align-items-center gap-2">
              <span><i class="ri-phone-line"></i></span>
                <p>+84975511697</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 broder-0 d-flex 
              align-items-center gap-2">
              <span><i class="ri-mail-send-line"></i></span>
                <p>shopthoitrangcongsonam@gmail.com</p>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>
        <Col lg='12'>
          <p className="footer_copyright"> 
          Copyright {year} developed
          by Nien Luan Co So Nganh righs </p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer