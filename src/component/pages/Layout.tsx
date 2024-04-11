import { Link, Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import { UserContext } from "../contexts/UserContextProvider";
import { useContext, useEffect, useState } from "react";
const Layout = () => {
  const { user, removeCurrentID } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (open == false) {
      setConfirm(false);
    }
  }, [open]);
  const onLogOut = () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    setOpen(false);
    removeCurrentID();
    navigate("/");
  };
  return (
    <div className="Allcontainer">
      <div className="font-['Poppins']">
        <header className="header">
          <div className="container">
            <div className="header-inner">
              <Link to="/" className="header__logo">
                <img src="/src/assets/logo.svg" alt="" />
              </Link>
              <div className="button-mobile">
                <button>=</button>
              </div>
              <nav className="main-menu">
                <ul className="main-menu__list">
                  <li className="main-menu__item">
                    <Link to="/" className="main-menu__link">
                      Home
                    </Link>
                  </li>
                  <li className="main-menu__item">
                    <Link to="/shop" className="main-menu__link">
                      Shop
                    </Link>
                  </li>
                  <li className="main-menu__item">
                    <Link to="/about" className="main-menu__link">
                      About
                    </Link>
                  </li>
                  <li className="main-menu__item">
                    <Link to="/contact" className="main-menu__link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              {user && user.active ? (
                <div className="header-items">
                  <div className="header-item-user mt-2 relative">
                    <button
                      className="item.start"
                      onClick={() => setOpen(!open)}
                    >
                      <h2>{user.name}</h2>
                    </button>
                    <div
                      className={`absolute font-[segoe script] shadow-md bg-white top-10 left-[-85px] rounded-md w-[200px] mt-4 p-4 rounded-xl ${
                        !open && "hidden"
                      }`}
                    >
                      <ul className="text-center">
                        {user.role >= 1 && (
                          <li className="hover:text-red-400">
                            <Link to="/admin/products">đăng nhập Admin</Link>
                          </li>
                        ) }
                        <li className="hover:text-red-400">
                          <button onClick={onLogOut}>{"Đăng Xuất"}</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="header-item-user mt-2">
                    <button>
                      <span>
                        <img src="/src/assets/akar-icons_search.png" />
                      </span>
                    </button>
                  </div>
                  <div className="header-item-user mt-2">
                    <Link to="/fav">
                      <span>
                        <img src="/src/assets/akar-icons_heart.png" />
                      </span>
                    </Link>
                  </div>
                  <div className="header-item-user mt-2">
                    <Link to="/cart">
                      <span>
                        <img src="/src/assets/ant-design_shopping-cart-outlined.png" />
                      </span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="header-items">
                  <div className="header-item-user mt-2">
                    <Link to="/login">
                      <span>
                        <img src="/src/assets/vektor.png" />
                      </span>
                    </Link>
                  </div>
                  <div className="header-item-user mt-2">  
                      <span>
                        <img src="/src/assets/akar-icons_search.png" />
                      </span>
                  </div>
                  <div className="header-item-user mt-2">
                      <span>
                        <img src="/src/assets/akar-icons_heart.png" />
                      </span>
                  </div>
                  <div className="header-item-user mt-2">
                    <Link to="/cart">
                      <span>
                        <img src="/src/assets/ant-design_shopping-cart-outlined.png" />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <Outlet />
        <footer className="footer">
          <div className="container">
            <div className="footer-list">
              <div className="footer-item">
                <img src="/src/assets/Funiro..png" className="mb-16" alt="" />
                <p className="footer__address">
                  400 University Drive Suite 200 Coral Gables, FL 33134 USA
                </p>
              </div>
              <div className="footer-nav">
                <div className="footer-item">
                  <h2 className="footer__title">Links</h2>
                  <ul className="footer-menu-list">
                    <li className="footer-menu-item">
                      <a href="/home/index.html" className="footer-menu-link">
                        Home
                      </a>
                    </li>
                    <li className="footer-menu-item">
                      <a href="/shop/index.html" className="footer-menu-link">
                        Shop
                      </a>
                    </li>
                    <li className="footer-menu-item">
                      <a href="" className="footer-menu-link">
                        Blog
                      </a>
                    </li>
                    <li className="footer-menu-item">
                      <a href="" className="footer-menu-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-item">
                  <h2 className="footer__title">Help</h2>
                  <ul className="footer-menu-list">
                    <li className="footer-menu-item">
                      <a href="" className="footer-menu-link font-medium">
                        Payment Options
                      </a>
                    </li>
                    <li className="footer-menu-item">
                      <a href="" className="footer-menu-link font-medium">
                        Returns
                      </a>
                    </li>
                    <li className="footer-menu-item">
                      <a href="" className="footer-menu-link font-medium">
                        Privacy Policies
                      </a>
                    </li>
                    <li className="footer-menu-item">
                      <a href="" className="footer-menu-link font-medium">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-item">
                <h2 className="footer__title">Newsletter</h2>
                <form action="" className="newsletter">
                  <input
                    type="text"
                    className="newsletter__input"
                    placeholder="Enter Your Email Address"
                  />
                  <button className="newsletter__btn font-medium">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <hr className="mb-8" />
            <p className="copyright font-font-medium">
              2023 furino. All rights reverved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export const BannerPage = () => {
  return (
    <section className="banner">
      <img
        src="https://picsum.photos/id/10/1440/500"
        alt=""
        className="banner__img"
      />
    </section>
  );
};

export const ServicePage = () => {
  return (
    <section className="services">
      <div className="container-fluid">
        <div className="service-list">
          <div className="service-item">
            <img src="/src/assets/trophy 1.png" className="service__image" />
            <div className="service-info">
              <h4 className="service__name font-bold">High Quality</h4>
              <p className="service__description">crafted from top materials</p>
            </div>
          </div>
          <div className="service-item">
            <img src="/src/assets/guarantee.png" className="service__image" />
            <div className="service-info">
              <h4 className="service__name font-bold">High Quality</h4>
              <p className="service__description">crafted from top materials</p>
            </div>
          </div>
          <div className="service-item">
            <img src="/src/assets/shipping.png" className="service__image" />
            <div className="service-info">
              <h4 className="service__name font-bold">High Quality</h4>
              <p className="service__description">crafted from top materials</p>
            </div>
          </div>
          <div className="service-item">
            <img
              src="/src/assets/customer-support.png"
              className="service__image"
            />
            <div className="service-info">
              <h4 className="service__name font-bold">High Quality</h4>
              <p className="service__description">crafted from top materials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
