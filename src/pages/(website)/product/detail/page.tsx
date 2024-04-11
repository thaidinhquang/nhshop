import { useProductQuery } from '@/common/hooks/useProductQuery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { faChevronCircleRight, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'; 
import useCart from '@/common/hooks/useCart'
const DetailProduct = () => {
    const { id } = useParams()
    const {data , mutate} = useCart();
    const { data: product, isLoading } = useProductQuery({ id: id! })
    console.log(product)
    const { data: relatedProduct } = useQuery({
        queryKey: ['RELATED_PRODUCT'],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/products/${product.category}/related/${product._id}`
            )
            return data
        }
    })

    if (isLoading) return <p>Loading...</p>
    console.log('relatedProduct', relatedProduct)
    return (
        <div>
            <section className="nav-bar">
        <div className="container">
            <ul className="nav-bar-deltail">
                <li className="nav-bar-item"><a href="" className="nav-bar-link font-bold text-black">Home
                    </a></li>
                <FontAwesomeIcon icon={faChevronCircleRight} />

                <li className="nav-bar-item"><a href="" className="nav-bar-link font-bold text-black">Shop
                    </a></li>
                <FontAwesomeIcon icon={faChevronCircleRight} />


                <li className="nav-bar-item"><a href="" className="nav-bar-link1 font-bold text-black "> {product.name}</a></li>
            </ul>
        </div>
    </section>
            <section className="deltail-product">
        <div className="container">
          <div className="detail-product-list grid grid-cols-2">
            <div className="detail-product-img gap-8">
              <div className="detail-product-img1">
                <img src= {product.image} alt="" className='my-2'/>
                <img src= {product.image} alt="" className='my-2'/>
                <img src= {product.image} alt="" className='my-2'/>
                <img src= {product.image} alt="" className='my-2'/>
              </div>
              <div className="detail-product-img2 w-full">
                <img src= {product.image} alt=""/>
              </div>
            </div>
            <div className="detail-product-item">
              <div className="detail-product-heading">
                <div className="detail-title">
                  <h2> {product.name}</h2>
                </div>
                <div className="detail-price">
                  <h3> {product.price}$</h3>
                </div>
                <div className="detail-evaluate">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalf} />

                  <span className="custom-review">5 Customer Review</span>
                </div>
                <div className="detail-reviews">
                  <p className="text-review"> {product.description}.</p>
                </div>
                <div className="detail-size">
                  <h4 className="text-size">Size</h4>
                  <div className="size">
                    <button className="size-l">
                      L
                    </button>
                    <button className="size-m">
                      M
                    </button>
                    <button className="size-s">
                      S
                    </button>
                  </div>
                </div>
                <div className="detail-color">
                  <h4 className="text-size">Color</h4>
                  <div className="color">
                    <div className="color-purple ">
                      <button className='bg-yellow-400 p-5 rounded-[100%]'></button>
                    </div>
                    <div className="color-black">
                      <button className='bg-black p-5 rounded-[100%]'></button>

                    </div>
                    <div className="color-brown">
                      <button className='bg-red-400 p-5 rounded-[100%]'></button>

                    </div>
                  </div>
                </div>
                <div className="detail-listtocart">
                  <button className="slots"><span className="remove">-</span><span className="slot">1</span><span className="add">+</span></button>
                  <button className="detail-addtocarts"
                  onClick={() => mutate({action:'ADD-TO-CART', productId: product._id, quantity: 1 })}
                  >
                  
                    Add To Cart
                    </button>
                  <button className="detail-compare">Compare</button>
                </div>
              </div>

              <hr className="line-pruduct" />
              <div className="detail-product-body">
                <table>
                  <tbody>
                    <tr>
                      <th className='text-left inline-block p-3'>SKU</th>
                      <td>:</td>
                      <td className="itemss">SS001</td>
                    </tr>
                    <tr>
                      <th className='text-left inline-block p-3'>Category</th>
                      <td>:</td>
                      <td className="itemss">Sofas</td>
                    </tr>
                    <tr>
                      <th className='text-left inline-block p-3'>Tags</th>
                      <td>:</td>
                      <td className="itemss">Sofa, Chair, Home, Shop</td>
                    </tr>
                    <tr>
                      <th className='text-left inline-block p-3'>Share</th>
                      <td>:</td>
                      <td className="icon">
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <FontAwesomeIcon icon={faTwitterSquare} />
                        <FontAwesomeIcon icon={faLinkedin} />

                        <i className="fa-brands fa-linkedin"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <hr className="title-line" />
          <section className="detail-information">
            <div className="container">
              <div className="nav-information">
                <ul className="nav-informations">
                  <li><a href="" className="text-informations">Description</a></li>
                  <li><a href="" className="text-informations">Additional Information</a></li>
                  <li><a href="" className="text-informations">Reviews [5]</a></li>
                </ul>
              </div>
              <div className="title-information">
                <p className="title-information1">Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
                <p className="title-information2">Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its className, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
              </div>
              <div className="img-information">
                <div className="img-information1"><img src="./img/Group 1071.png" alt=""/></div>
                <div className="img-information2"><img src="./img/Group 1062.png" alt=""/></div>
              </div>
            </div>
          </section>
        </div>
      </section>

            <hr />
            <div className="container">
            <div className="section-heading">
                <h2 className="section-heading__title">Related Products</h2>
            </div>
            

            <div className="section-body">
                <div className="product-list">
                    {relatedProduct?.map((item: any) => (
                      <div className="product-item">
                      <div className="product-image">
                          <img
                              src={item.image}
                              alt=""
                              className="product__thumbnail"
                          />
                          <span className="product-sale">{item.discount}%</span>
                      </div>
                      <div className="product-info">
                          <h3 className="product__name">
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                          </h3>
                          <a href="" className="product__category">Stylish cafe chair</a>
                          <div className="product-price">
                              <span className="product-price__new">{item?.price - item?.price * (item?.discount / 100)}$</span>
                              <span className="product-price__old">{item.price}</span>
                          </div>
                      </div>
                      <div className="product-actions">
                          <button className="btn product-action__quickview" >
                            <Link to={`/products/${product._id}`} className='btn product-action__quickview'>
                                  Quick View
                              </Link>
                          </button>
                          <button className="btn product-action__addtocart" onClick={() => mutate({action:'ADD-TO-CART', productId: product._id, quantity: 1 })}
                          
                          >
                            Add To Cart
                          
                          </button>
                          <div className="product-actions-more">
                              <span className="product-action__share">Share</span>
                              <span className="product-action__compare">Compare</span>
                              <span className="product-action__like">Like</span>
                          </div>
                      </div>
                  </div>
                    ))}
                    
   
                </div>
                <div className="relate-product-showmore">
                    <button className="btn-showmore">Show More</button>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default DetailProduct

//<Link to={`/products/${item._id}`}>{item.name}</Link>