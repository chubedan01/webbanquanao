
// tranh tinh trang reload lai trang no bi xoay vong

import React from 'react'
const Helmet = (props) => {
  document.title="Maltimart -" + props.title;//Cập nhật tiêu đề tài liệu bằng cách nối props.title với văn bản mong muốn. Sử dụng toán tử gán (=) để gán tiêu đề cập nhật cho document.title.
  return <div className="w-100">{props.children}</div>;  //Trả về phần tử JSX có div có tên lớp là "w-100" và chứa các thành phần con bằng cách sử dụng props.children.
};

export default Helmet