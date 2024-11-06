import React from 'react';
import loader from '../images/loader.gif';
const Loader = () => {
    return(
        <div className="container loader">
            <div className="row">
                <div className="col-12 loader_div">
                    <img src={loader} className="img-fluid" alt="loading"></img>
                </div>
            </div>
        </div>
    );
}
export default Loader;