/* eslint-disable @typescript-eslint/no-explicit-any */
import Catergories from '@/pages/(website)/product/_components/CategoryList'
import { useProductQuery } from '@/common/hooks/useProductQuery'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from '@/pages/(website)/product/_components/ProductList'
import { Banner14, Banner15, Banner16, Service1, Service2, Service3 } from '@/upload'
import Banner from '../home/_component/Banner'

const ShopPage = () => {
    const [params] = useSearchParams()
    const page = params.get('page')

    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(page || 1)

    const { data, isLoading, refetch } = useProductQuery({ _page: page, _limit: limit })
    useEffect(() => {
        if (page && +page !== currentPage) {
            setCurrentPage(+page)
        }
    }, [page, currentPage])

    const handleLimitChange = (event: ChangeEvent<any>) => {
        setLimit(event.target.value)
        refetch() // Gọi lại API với limit mới và trang đầu tiên
    }
    const { data: products, pagination } = data || { data: [], pagination: {} }
    if (isLoading) return <div>...Loading</div>

    return (
        <div className="">
            <Banner />
            <section className="banner">
                {/* <img src="https://picsum.photos/id/10/1440/500" alt="" className="banner__img" /> */}
                <div className="banner-item">
                    <div className="container">
                    <div className="banner-nav">
                        <div className="banner-item-menu">
                        <div className="banner-item-menu-icon">
                            <span><img src={Banner14} alt="" />Filter</span>
                            <span><img src={Banner15} alt="" /></span>
                            <span><img src={Banner16} alt="" /></span>
                            <span className="showing">Showing 1–16 of 32 results</span>
                        </div>
                        </div>
                        <div className="banner-item-form">
                        <div className="form-menu">
                            <label htmlFor="">Show</label>
                            <input type="text" className="show-input" placeholder="16" />
                        </div>
                        <div className="form-menu">
                            <label htmlFor="">Short by</label>
                            <input type="text" className="shortby-input" placeholder="Default" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <div className='container'>
            <hr />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                
                    <div className='limit-dropdown container'>
                        <label htmlFor='limit' className='font-bold'>Show:</label>
                        <select id='limit' onChange={handleLimitChange} defaultValue={limit} className='w-[200px] border border-solid border-gray my-4'>
                            <option value='2'>2</option>
                            <option value='4'>4</option>
                            <option value='6'>6</option>
                            <option value='10'>10</option>
                        </select>
                    </div>
                    <ProductList products={products} pagination={pagination} />
                </>
            )}
            <div className='service-list my-4'>
                    <div className='service-item'>
                        <img src={Service1} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className='service-item'>
                        <img src={Service2} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className='service-item'>
                        <img src={Service3} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className='service-item'>
                        <img src={Service1} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                </div>
        </div>
        </div>
    )
}

export default ShopPage
