import React from 'react';

function App() {

    return (
        <div>

            <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                    <div className="container">
                        <h1 className="header center teal-text text-lighten-2">Budget App Name</h1>
                        <div className="row center">
                            <h5 className="header col s12 light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h5>
                        </div>
                        <div className="row center">
                            <a href="#!" className="btn-large waves-effect waves-light lighten-1">Find more</a>
                        </div>
                    </div>
                </div>
                <div className="parallax"><img src="budget.jpg" alt="img" /></div>
            </div>

            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center"><i className="material-icons" style={{ color: '#333' }}>attach_money</i></h2>
                                <h5 className="center">Feature one</h5>
                                <p className="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center"><i className="material-icons" style={{ color: '#333' }}>shopping_cart</i></h2>
                                <h5 className="center">Feature two</h5>
                                <p className="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center"><i className="material-icons" style={{ color: '#333' }}>account_balance</i></h2>
                                <h5 className="center">Feature three</h5>
                                <p className="light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container valign-wrapper section scrollspy" id="aboutus">
                <div className="section no-pad-bot">
                    <div className="container">
                        <div className="center row col s3">
                            <h3>About Us</h3>
                        </div>
                        <div className="center row col s12">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        </div>
                    </div>
                </div>
                <div><img src="#" alt="img" /></div>
            </div>
        </div>
    );
}

export default App;
