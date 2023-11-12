import { async } from '@firebase/util'
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [enterQuantity, setEnterQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProducts = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress (optional)
        },
        (error) => {
          toast.error('Tải ảnh lên không thành công!');
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const docRef = await addDoc(collection(db, 'products'), {
              productsName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
              quantity: enterQuantity,
            });
            setLoading(false);
            toast.success('Đã thêm sản phẩm thành công!');
            navigate('/dashboard/all-products');
          });
        }
      );
    } catch (error) {
      toast.error('Thêm sản phẩm không thành công');
      setLoading(false);
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading....</h4>
            ) : (
              <>
                <h4 className='mb-4 fw-bold mt-3 text-center'> ADD PRODUCT</h4>
                <Form className="" onSubmit={addProducts}>
                  <FormGroup className="form_group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Áo sơ mi"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form_group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="Lorem....."
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form_group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description........."
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form_group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="10$"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form_group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                      >
                        <option>Selection category</option>
                        <option value="aosomi">Áo sơ mi</option>
                        <option value="quanau">Quần áo</option>
                        <option value="giaytay">Giày tây</option>
                        <option value="thatlung">Thắt lưng</option>
                        <option value="vi">Ví</option>
                      </select>
                    </FormGroup>
                  </div>

                  <FormGroup className="form_group">
                    <span>Enter Quantity</span>
                    <input
                      type="number"
                      placeholder="Quantity...."
                      value={enterQuantity}
                      onChange={(e) => setEnterQuantity(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div>
                    <FormGroup className="form_group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>

                  <button className="buy_btn" type="submit">
                    Add product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
