import React from 'react';
import wavelogo from '../assets/wave-wealthlogo.png';

function App() {
    return (
        <div>
            {/* wave animation */}
            <div className="landing-animation">
                <div className="sine-wave">
                    <svg className="svg-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                        </defs>
                        <g className="svg-waves__parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0"></use>
                            <use xlinkHref="#gentle-wave" x="48" y="3"></use>
                            <use xlinkHref="#gentle-wave" x="48" y="5"></use>
                            <use xlinkHref="#gentle-wave" x="48" y="7"></use>
                        </g>
                    </svg>
                </div>
                {/* Content inside WaveAnimation */}
                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <img src={wavelogo} alt="Wealthwave Logo2" className="responsive-img2" />
                        <div className="container">
                            <h1 className="header center teal-text text-lighten-2">WEALTHWAVE</h1>
                            <div className="row center">
                                <h5 className="header col s12 light">Ride the Wave to Wealth! <br></br></h5>
                            </div>
                            <div className="row center">
                                <a href="#!" className="btn-large waves-effect waves-light lighten-1">Find out more</a>
                            </div>
                        </div>
                    </div>
                    <div className="parallax"><img src="budget.jpg" alt="img" /></div>
                </div>
            </div>
            {/* end of wave animation */}


            <div className="container valign-wrapper section scrollspy" id="aboutus">
                <div className="section no-pad-bot">
                    <div className="container">
                        <div className="center row col s3">
                            <h3>About Us</h3>
                        </div>
                        <div className="center row col s12">
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p> */}

<p>Welcome to our financial assistance platform! <br></br>We are dedicated to helping you achieve financial wellness and stability. </p>
               <p>Explore our platform for a comprehensive range of financial tools and resources. Benefit from intuitive budgeting tools to effortlessly manage your finances. Access expert advice tailored to your specific financial needs, from retirement planning to debt management. Utilize our interactive chatbox for instant tips and guidance on budgeting and saving, available 24/7 to support your financial journey.</p>
                <p>At WealthWave, we are committed to empowering you on your financial journey. Take control of your finances and achieve your goals with our comprehensive suite of tools and resources.</p>
                        </div>
                    </div>
                </div>
                {/* <div><img src="#" alt="img" /></div> */}
            </div>
            

            <div className="container section-container">

                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center"><i className="material-icons" style={{ color: '#333' }}>attach_money</i></h2>
                                    <h5 className="center">Budgeting Tools</h5>
                                    <p className="light">Our website offers built-in budgeting functionality to help you manage your finances effectively. With our intuitive tools, you can track your income, expenses, and savings goals with ease. </p>
                                </div>
                            </div>
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center"><i className="material-icons" style={{ color: '#333' }}>shopping_cart</i></h2>
                                    <h5 className="center">Financial Wellness Articles</h5>
                                    <p className="light">Explore our collection of articles and resources focused on financial wellness. From saving strategies to investment tips, we provide valuable insights to help you make informed financial decisions </p>
                                </div>
                            </div>
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center"><i className="material-icons" style={{ color: '#333' }}>account_balance</i></h2>
                                    <h5 className="center">Interactive Chatbox</h5>
                                    <p className="light">Have questions about your finances? Our interactive chatbox is available 24/7 to provide quick answers and tips. Chat with our virtual assistant to get instant pointers on budgeting, saving, and more.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
