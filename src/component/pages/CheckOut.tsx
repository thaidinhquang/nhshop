import { BannerPage, ServicePage } from "./Layout"

const CheckOut = () => {
    return (
        <div>
            {<BannerPage />}
            <section className="container">
                <div className="Billing_Details">
                    <div className="section-heading">
                        <h2 className="section-heading__title">Billing details</h2>
                        <div className="Billing_name">
                            <div className="first_name">
                                <label className="label_name">First name</label>
                                <input type="text" className="input_first_name py-2 px-4" />
                            </div>
                            <div className="last_name">
                                <label className="label_name">Last name</label>
                                <input type="text" className="input_last_name py-2 px-4" />
                            </div>
                        </div>
                        <label className="label_name">Company Name (Optional)</label>
                        <input type="text" className="input_company_name py-2 px-4" />
                        <label className="label_name">Country / Region</label>
                        <select name="Country" className="select_country py-2 px-4">
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Viet Nam">Viet Nam</option>
                        </select>
                        <label className="label_name">Street address</label>
                        <input type="text" className="input_address py-2 px-4" />
                        <label className="label_name">Town / City</label>
                        <input type="text" className="input_city py-2 px-4" />
                        <label className="label_name">Province</label>
                        <select name="Province" className="input_province">
                            <option value="Western Province">Western Province</option>
                            <option value="Nord Province">Western Province</option>
                        </select>
                        <label className="label_name">ZIP code</label>
                        <input type="text" className="input_code py-2 px-4" />
                        <label className="label_phone">Phone</label>
                        <input type="text" className="input_phone py-2 px-4" />
                        <label className="label_name">Email address</label>
                        <input type="text" className="input_email py-2 px-4" />
                        <input
                            type="text"
                            placeholder="Additional information"
                            className="input_infor py-2 px-4"
                        />
                    </div>
                    <div className="Billing-Submit">
                        <div className="Billing-Submit-infor">
                            <table className="table">
                                <tr>
                                    <th className="product_title"><h3>Product</h3></th>
                                    <th className="subtotal_title"><h3>Subtotal</h3></th>
                                </tr>
                                <tr>
                                    <td className="product_title_detail">
                                        <p className="product_title_detail_sofa">
                                            Asgaard sofa<span className="quantity"> x 1</span>
                                        </p>
                                    </td>
                                    <td className="subtotal_title_detail"><p>25.000.000đ</p></td>
                                </tr>
                                <tr>
                                    <td className="product_title_detail"><p>Subtotal</p></td>
                                    <td className="subtotal_title_detail"><p>25.000.000đ</p></td>
                                </tr>
                                <tr>
                                    <td className="product_title_detail"><p>Total</p></td>
                                    <td className="subtotal_title_detail">
                                        <p className="subtotal_title_detail_total">250.00.000đ</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <hr />
                        <div className="select-item1">
                            <input type="radio" name="Direct Bank Transfer" /><span
                                className="service-item1-radio-first py-2 px-4"
                            >Direct Bank Transfer</span>
                        </div>
                        <div className="select-item1-box">
                            <span className="select-item1-text">
                                Make your payment directly into our bank account. Please use your
                                Order ID as the payment reference. Your order will not be shipped
                                until the funds have cleared in our account.
                            </span>
                        </div>
                        <div className="select-item1">
                            <input type="radio" name="Direct Bank Transfer" /><span
                                className="Direct_Bank_Transfer py-2 px-4"
                            >Direct Bank Transfer</span>
                        </div>
                        <div className="select-item1">
                            <input type="radio" name="Direct Bank Transfer" /><span
                                className="Direct_Bank_Transfer py-2 px-4"
                            >Cash On Delivery</span>
                        </div>
                        <div className="select-item1-box2">
                            <p>
                                Your personal data will be used to support your experience
                                throughout this website, to manage access to your account, and for
                                other purposes described in our <strong>privacy policy.</strong>
                            </p>
                        </div>
                        <div className="flex_button">
                            <button className="button"><p>Place order</p></button>
                        </div>
                    </div>
                </div>
            </section>
            {<ServicePage />}
        </div>
    )
}

export default CheckOut