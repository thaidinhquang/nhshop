import useHookQuery from "../hooks/useHookQuery"
import { BannerPage, ServicePage } from "./Layout"
import ListProductPage from "./ListProduct"
const HomePage = () => {
    const { data, isLoading } = useHookQuery({ path: 'products', limitProductOnPage: 4 })
    return (
        <div className="font-['Poppins']">
            <BannerPage />
            <section className="news">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">New</h2>
                    </div>
                    <div className="section-body">
                        {isLoading ? <div>Loading...</div> : <ListProductPage data={data} />}
                    </div>
                </div>
            </section>
            <section className="shop">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">Shop</h2>
                    </div>
                    <div className="section-body">
                        <div className="shops">
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/12/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/13/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/14/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                            <div className="shop-item">
                                <a href="" className="shop__link"><img src="https://picsum.photos/id/15/665/500" alt=""
                                    className="shop__image" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog">
                <div className="container">
                    <div className="section-heading section-blog-heading">
                        <h2 className="section-heading__title">Blog</h2>
                    </div>
                    <div className="section-body">
                        <div className="post-list">
                            <div className="post-item">
                                <div className="post-image">
                                    <a href="">
                                        <img src="https://picsum.photos/id/16/665/250" alt="" className="post__thumbnail" />
                                    </a>
                                </div>
                                <div className="post-info">
                                    <h3 className="post__title">
                                        <a href="" className="post__link">THE ULTIMATE SOFA BUYING GUIDE</a>
                                    </h3>
                                    <p className="post__excerpt">
                                        The versatility of our living space is more crucial than ever.
                                        But buying a sofa might be a difficult undertaking. Your needs
                                        and the size of your living area will determine everything,
                                        However, don’t worry, were are here to help you
                                    </p>
                                    <a href="" className="post__readmore font-medium">Read more</a>
                                </div>
                            </div>
                            <div className="post-item">
                                <div className="post-image">
                                    <a href="">
                                        <img src="https://picsum.photos/id/17/665/250" alt="" className="post__thumbnail" />
                                    </a>
                                </div>
                                <div className="post-info">
                                    <h3 className="post__title">
                                        <a href="" className="post__link">THE ULTIMATE SOFA BUYING GUIDE</a>
                                    </h3>
                                    <p className="post__excerpt">
                                        The versatility of our living space is more crucial than ever.
                                        But buying a sofa might be a difficult undertaking. Your needs
                                        and the size of your living area will determine everything,
                                        However, don’t worry, were are here to help you
                                    </p>
                                    <a href="" className="post__readmore font-medium">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ServicePage />
        </div>
    )
}

export default HomePage