
import React,{ useEffect, useState} from 'react'
import CommonSection from '../components/IU/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container,Row,Col } from 'reactstrap';
import "../styles/shop.css";
import ProductList from '../components/IU/ProductList';
import useGetData from '../custom-hooks/useGetData';
/*
 Hàm này sử dụng Hook "useState" để tạo ra một state "productsdata" và một function "setproductdata" để cập nhật state này. State "productsdata" được khởi tạo bằng giá trị ban đầu là "products". 
Hàm này cũng định nghĩa một hàm con tên là "handlefilter" để xử lý việc lọc các sản phẩm.
Hàm này nhận vào một event object "e" và lấy giá trị lọc từ trường "value" của event. 
Nếu giá trị lọc là "sofa", hàm sẽ lọc các sản phẩm trong "products" theo điều kiện là "item.category" bằng "sofa" và gán kết quả lọc vào biến "filteredproducts".
*/

const Shop = () => {

  const {data: productsdb, loading } =  useGetData('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [productsData, setProductData] = useState([]); // Initialize with an empty array
  
  useEffect(() => {
    if (!searchTerm) {
      // If no search term, set productsData to the original products
      setProductData(productsdb);
    }
  }, [searchTerm, productsdb]);
 

  const handleFilter =(e)  => {
   
    const filterValue = e.target.value// target.value là lấy giá trị của thằng e
    
    if(filterValue==="all"){
      const filteredProducts = productsdb;
      setProductData(filteredProducts);
    }



    if(filterValue==='somi'){
      const filteredProducts = productsdb.filter(
      (item) => item.category === "aosomi" 
      // thuộc tính category được đặt trong file data trả về là trả vê một
      );
      setProductData(filteredProducts);

    }
    // loc lay san pham la quan au
    if(filterValue==="quanau"){
      const filteredProducts = productsdb.filter(
      (item)=> item.category==="quanau"
      );
      setProductData(filteredProducts);
    }
    
    if(filterValue==="giaytay"){
      const filteredProducts = productsdb.filter(
      (item)=> item.category==="giaytay"
      );
      setProductData(filteredProducts);
    }
    
    if(filterValue==="vi"){
      const filteredProducts = productsdb.filter(
      (item)=> item.category==="vi"
      );
      setProductData(filteredProducts);
    }

   

  }

  
  const handleSearch = (e) => {
    const searchTerm = e.target.value || '';
    if (productsdb) {
      const searchedProducts = productsdb.filter((item) =>
        (item.productsName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    
      if (searchTerm === '') {
        setProductData(productsdb);
      } else {
        setProductData(searchedProducts);
      }
    }
  };

  return <Helmet title='Shop'>
    <CommonSection title='Products'/>
    {/* thanh phan loai */}
    <section>
      <Container>
        <Row>
          <Col lg='3' md='6' className='text-end'>
          <div className="filter_widget" onChange={handleFilter}>
              <select >{/*khi thay doi thì nó sẽ gọi hàm lọc dựa trên giá trị value của từng option*/} 
              {/*  */}
                <option>Filter By Category</option>
                <option value="all">All</option>
                <option value="somi">Somi</option>
                <option value="quanau">Quanau</option>
                <option value="giaytay">Giaytay</option>
                <option value="thatlung">Thatlung</option>
                <option value="vi">Vi</option>
              </select>
            </div>
          </Col>
          <Col lg='3' md='12'>
          <div className="filter_widget">
              <select>
                <option>Filter By</option>
                <option value="asscending">Asscending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </Col>
        
          <Col lg='6' md='6'>
            <div className="search_box">
              <input type="text" placeholder="seach......" onChange={handleSearch}/> 
              <span>
              <i class="ri-search-line"></i>
              </span>
            </div>
          </Col>
          
        </Row>
      </Container>
    </section>
    {/*thanh tiem kiem*/}
   <section className="pt-30"> 
     <Container className="">
       <Row className='ProductList'>
       {
           productsData.length === 0? 
           ( <h1 className='text-center fs-4'>No products are found!</h1>)
           :
           (
             
                 <ProductList data = {productsData}/>
             
          // TẠO RA LIST SAN PHAM DUA TREN IU CO SAN
           )}
       </Row>
     </Container>
     
   </section> 
  </Helmet>
}
export default Shop
