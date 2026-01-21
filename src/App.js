import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga4"; // استدعاء جوجل أناليتكس
// 👇 1. استدعاء مكتبة التنبيهات وتنسيقاتها
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

import './App.css';
import webImge from './web.jpg';
import dezImge from './dez.jpg';

function App() {

  // كود تشغيل جوجل أناليتكس
  useEffect(() => {
    ReactGA.initialize("G-J86V20VFYC");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  const phoneNumber = "966555618227"; 

  const [products] = useState([
  
    {
      id: 2,
      name: "متجر إلكتروني",
      desc: "بيع منتجاتك واستقبل المدفوعات مع لوحة تحكم",
      price: 4500,          
      oldPrice: 7500,       
      image: dezImge
    },
    {
      id: 3,
      name: " تصميم صفحات الهبوط ",
      desc: "مثالية للمطاعم (منيو)، العروض الخاصة",
      price: 299,          
      oldPrice: 650,       
      image: webImge
    },
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const scrollToProducts = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 👇 2. تعديل دالة الإضافة لتشغيل التنبيه
  const addToCart = (product) => {
    setCart([...cart, product]);
    
    // إظهار رسالة نجاح أنيقة
    toast.success(`تم إضافة "${product.name}" للسلة بنجاح! 🛒`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark", // اخترنا الثيم الداكن ليناسب موقعك
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
    // تنبيه عند الحذف
    toast.error("تم حذف المنتج من السلة 🗑️", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
    });
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const handleContact = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) {
        // تنبيه إذا كانت السلة فارغة
        toast.warn("السلة فارغة! أضف منتجات أولاً ", {
            position: "top-center",
            theme: "dark",
        });
        return;
    }

    let message = `مرحباً SOUL، أرغب بطلب الخدمات التالية:%0a%0a`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.price} ر.س)%0a`;
    });

    message += `%0a*المجموع الكلي: ${totalAmount} ر.س*%0a`;
    message += `يرجى تزويدي بطريقة الدفع لإتمام الطلب 💳`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="App">
      {/* 👇 إعدادات الـ SEO تضاف هنا في البداية */}
      <Helmet>
        <title>سول - تصميم مواقع ومتاجر إلكترونية</title>
        <meta name="description" content="خدمات تصميم مواقع ومتاجر إلكترونية احترافية. صمم موقعك وابدأ انطلاقتك الآن." />
        <meta name="keywords" content="تصميم مواقع, برمجة متاجر, متجر الكتروني, تطوير ويب, تصميم واجهات, السعودية, رياكت, React, صفحات هبوط, برمجة خاصة" />
      </Helmet>
      {/* 👇 3. وضع حاوية التنبيهات هنا لتعمل في كل الموقع */}
      <ToastContainer />

      <nav className="navbar">
        <div className="logo" translate="no" onClick={scrollToTop} style={{cursor: 'pointer'}}>SOUL</div>
        <div className="nav-links">
          <span onClick={scrollToTop} style={{cursor: 'pointer'}}>الرئيسية</span>
          <span onClick={scrollToProducts} style={{cursor: 'pointer'}}>باقات المواقع</span>
        </div>
        <div className="nav-icons" onClick={() => setShowCart(true)} style={{cursor: 'pointer', position: 'relative'}}>
          <span>🛒</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </div>
      </nav>

      {showCart && (
        <div className="cart-overlay">
          <div className="cart-popup">
            <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
            <h2 style={{color: '#153E2E'}}>ملخص الطلب ({cart.length})</h2>
            
            {cart.length === 0 ? (
              <div style={{textAlign: 'center', marginTop: '50px', color: '#777'}}>
                <p>السلة فارغة حالياً 🛒</p>
                <button className="btn-white" onClick={() => setShowCart(false)} style={{backgroundColor:'#153E2E', color:'white', marginTop:'20px'}}>تصفح الخدمات</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <span>{item.name}</span>
                      <span style={{fontWeight:'bold', color: '#153E2E'}}>{item.price} ر.س</span>
                      <button className="remove-btn" onClick={() => removeFromCart(index)}>✕</button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer-section">
                  <div className="cart-total">
                    <span>المجموع المستحق:</span>
                    <span style={{color: '#D4AF37'}}>{totalAmount} ر.س</span>
                  </div>
                  
                  <button className="btn-whatsapp-checkout" onClick={checkoutViaWhatsApp}>
                    إرسال الطلب عبر واتساب 📱
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="hero-container">
        <div className="hero-box">
          <div className="hero-content">
            <h1>صمم موقعك <br/> وابدأ انطلاقتك</h1>
            <p>خدمات تصميم مواقع ومتاجر إلكترونية احترافية</p>
            <button className="btn-white" onClick={scrollToProducts}>تصفح الباقات</button>
          </div>
          <div className="hero-image">
             <img 
              src="https://png.pngtree.com/png-clipart/20230809/original/pngtree-a-programmer-analyzing-on-laptop-screen-with-multiple-programming-languages-displayed-png-image_10207539.png" 
              alt="Programmer" 
              style={{width: '100%', maxWidth: '450px'}}
            />
          </div>
        </div>
      </div>

      <h2 className="section-title" id="products-section">باقاتنا المميزة</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="card-img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="card-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              
              <div className="price-row" style={{alignItems: 'center'}}>
                
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    {product.oldPrice && (
                        <span style={{
                            textDecoration: 'line-through', 
                            color: '#999', 
                            fontSize: '12px',
                            marginBottom: '-5px'
                        }}>
                            {product.oldPrice} ر.س
                        </span>
                    )}
                    <span className="price">
                        {product.price} <small style={{fontSize:'14px'}}>ر.س</small>
                    </span>
                </div>

                <button className="add-btn" onClick={() => addToCart(product)}>+</button>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="contact-cta">
        <h2>جاهز لتحويل فكرتك إلى واقع؟</h2>
        <button 
          className="btn-white" 
          style={{backgroundColor: '#153E2E', color: 'white'}}
          onClick={handleContact}
        >
          تواصل معنا الآن 📞
        </button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3 translate="no">SOUL</h3>
            <p>  متخصصة في تصميم المواقع</p>
          </div>

          <div className="trust-badge-container">
            <div className="trust-badge">
              <span className="badge-icon">✅</span>
              <div className="badge-text">
                <span className="badge-title">موثق في منصة الأعمال رقم الوثيقة</span>

                <span className="badge-number"> : FL-379392865</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
           <h4>تواصل معنا</h4>
           <ul className="footer-links">
           <li style={{ cursor: 'pointer' }} onClick={handleContact}>
          <span style={{ direction: 'ltr', display: 'inline-block' }}>+966 555618227</span> 📱
         </li>
       </ul>
     </div>
        </div>
        <div className="copyright"><div className="copyright">جميع الحقوق محفوظة ©  2025  </div></div>
      </footer>
    </div>
  );
}

export default App;