import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import { motion } from 'framer-motion'
import '../services/services.css'
import serviceData from '../assets/data/serviceData'
const services = () => {
  return <section className="services">
    <Container>
      <Row>
        {
        serviceData.map((item,index)=>(
        <Col lg='3'md='4' key={index}>
          <motion.div whileHover={{scale: 1.1}} className="service_item"style={{background:`${item.bg}`}}>
            <span><i class={item.icon}></i></span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </motion.div>
        </Col>
          ))

        }
        {
        /*
        motion.div` từ thư viện Framer Motion để bật hoạt hình theo tỷ lệ khi thành phần được di chuột qua.
        Prop `item.bg` được sử dụng để tự động thiết lập màu nền của div. 
        Bạn có thể tùy chỉnh nội dung bên trong thành phần `ServiceItem` theo yêu cầu của mình.
        */
        }
        
      </Row>
    </Container>
  </section>
}

export default services