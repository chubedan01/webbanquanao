import React from 'react'
import { Container } from 'reactstrap'
import '../../styles/common-section.css'

const CommonSection = ({title}) => {// title truyen vao luc goi ham ben trang 
  return(
    <section className="common_section">
    <Container className="text-center">
      <h1>{title}</h1>
    </Container>

  </section>
  );
   

};

export default CommonSection