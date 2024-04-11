import { Link, NavLink } from 'react-router-dom'
import { CartIcon, Logo, SearchIcon, UserIcon, WishlistIcon } from './icons'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import instance from '@/configs/axios'

const Header = () => {
   const { data: user } = useQuery({
    queryKey: ['SIGNIN_KEY'],
    queryFn: async () => {
        return await instance.get(`/auth/signin`)
    }
   })
    return (
        <header className='header'>
            <div className='container'>
                <div className='header-inner'>
                    <Link to='/' className='header__logo'>
                        <img src={Logo} alt='#' />
                    </Link>
                    <div className='button-mobile'>
                        <button>=</button>
                    </div>
                    <nav className='main-menu'>
                        <ul className='main-menu__list'>
                            <li className='main-menu__item'>
                                <NavLink to='/' className='main-menu__link'>
                                    Home
                                </NavLink>
                            </li>
                            <li className='main-menu__item'>
                                <NavLink to='/shop' className='main-menu__link'>
                                    Shop
                                </NavLink>
                            </li>
                            <li className='main-menu__item'>
                                <NavLink to='/about' className='main-menu__link'>
                                    About
                                </NavLink>
                            </li>
                            <li className='main-menu__item'>
                                <NavLink to='/contact' className='main-menu__link'>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className='header-items'>
                        <div className='header-item-user'>
                            <span>
                                
                                <Link to={`/signin`}><img src={UserIcon} /></Link>
                            </span>
                        </div>
                        <div className='header-item-user'>
                            <span>
                                <img src={SearchIcon} />
                            </span>
                        </div>
                        <div className='header-item-user'>
                            <span>
                                <img src={WishlistIcon} />
                            </span>
                        </div>
                        <div className='header-item-user'>
                            <span>
                                <Link to={`/cart`}><img src={CartIcon} /></Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
