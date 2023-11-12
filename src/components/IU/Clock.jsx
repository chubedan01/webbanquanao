
  /*
  hook là một hàm JavaScript cho phép bạn sử dụng 
  trạng thái và các tính năng khác của React trong các thành phần chức năng

  useState`: Hook `useState` cho phép bạn khai báo và sử dụng state trong một functional component.
  Bằng cách gọi `useState` với giá trị khởi tạo ban đầu, nó sẽ trả về một cặp giá trị:
  state hiện tại và một hàm để cập nhật state đó.
  
 `useEffect`: Hook `useEffect` cho phép bạn thực hiện các hiệu ứng (side effects) 
  trong một component functional. Bằng cách truyền một hàm vào `useEffect`, 
  React sẽ gọi hàm đó sau mỗi lần component được render lại.

  */


import React,{useState,useEffect} from 'react';
import '../../styles/clock.css'
const Clock = () => {

  const [days,setDays]= useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  
  let interval;
  const countDown = ()=>{
    const destination = new Date('Oct 10, 2023')// tao thoi gian ket thuc cua su kien giam gia
  
    //// Bắt đầu đếm ngược bằng cách cập nhật liên tục các biến trạng thái
    interval = setInterval(()=>{//Thiết lập khoảng thời gian bằng cách sử dụng `setInterval()` để thực thi hàm được cung cấp theo các khoảng thời gian đều đặn.
  
      const now =new Date().getTime()
      const different = destination - now// tinh thoi gian tren lech giua thoi gian thuc now va thoi gian xac dinh nao do 
  
      //// Tính ngày, giờ, phút, giây từ chênh lệch múi giờ
      const days = Math.floor(different/
      (1000 *60*60*24))//Tính số giờ còn lại bằng cách lấy phần còn lại của chênh lệch thời gian chia cho số mili giây trong một ngày (`1000 * 60 * 60 * 24`),
      const hours = Math.floor(different%
      (1000 *60*60*24)/(1000 *60*60))
      const minutes =Math.floor(different%
      (1000 *60*60)/(1000 *60))
      const seconds =Math.floor(different%
      (1000 *60)/(1000))
  
      // Xóa khoảng thời gian khi đến thời gian đích
      if(destination < 0) clearInterval(interval.current)
      else{
  
      //// Cập nhật các biến trạng thái với các giá trị được tính toán
          setDays(days) // gọi lại các useState để câp nhật lại các biến đã khai bao san
          setHours(hours)
          setMinutes(minutes)
          setSeconds(seconds)
      }
    });
  };
  
  useEffect(() => {
    countDown();
  }, []);

  
  return( 
  <div className="clock_wrapper d-flex align-items gap-5">
    <div className="clock_data d-flex align-items gap-5">
      <div>
        <h1 className="text-white fs-3">{days}</h1>
        <h5 className="text-white fs-6" >Days </h5>
      </div>
      <span className="text-white fs-3">:</span>
      </div>

      <div className="clock_data d-flex align-items-center gap-5">
        <div className="text-center">
          <h1 className="text-white fs-3">{hours}</h1>
          <h5 className="text-white fs-6">Hours</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock_data d-flex align-items-center gap-3">
        <div className="tex-center">
          <h1 className="text-white fs-3 mb-2">{minutes}</h1>
          <h5 className="text-white fs-6">Minutes</h5>
        </div>
      </div>
      
    </div>
  )
    
}

export default Clock