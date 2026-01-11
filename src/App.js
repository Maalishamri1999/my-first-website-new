import React, { useState } from 'react';
import './App.css';
import webImge from './web.jpg';
import dezImge from './dez.jpg';

function App() {
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

  // 👇 وظيفة للتمرير السلس إلى قسم الباقات
  const scrollToProducts = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 👇 وظيفة للعودة للأعلى (زر الرئيسية)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const handleContact = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) return alert("السلة فارغة!");

    let message = `مرحباً SOUL، أرغب بطلب الخدمات التالية:%0a%0a`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.price} ر.س)%0a`;
    });

    message += `%0a*المجموع الكلي: ${totalAmount} ر.س*%0a`;
    message += `يرجى تزويدي بطريقة الدفع لإتمام الطلب 💳`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo" translate="no" onClick={scrollToTop} style={{cursor: 'pointer'}}>SOUL</div>
        <div className="nav-links">
          {/* ✅ تم تفعيل الأزرار هنا */}
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
            {/* ✅ تم تفعيل الزر هنا */}
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

      {/* ✅ أضفنا ID هنا عشان الأزرار تعرف وين تروح */}
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
                    {/* السعر القديم */}
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
                    {/* السعر الجديد */}
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
      {/* وضعنا الرقم داخل span وأعطيناه اتجاه LTR عشان يضبط الزائد */}
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