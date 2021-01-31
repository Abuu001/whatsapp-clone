import React from 'react'
import "./ChatCardListing.css"

function ChartCardListing() {
    return (
        <div className="chartCard__Listing">
            <div className="card">
                <div className="card__det">
                    <div className="img__Container">
                     <img alt="image" src="data:image/png;base64,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" />
                    </div>
                    <div className="card__Detail">
                        <h5 className="title"> 
                            Go Lang
                        </h5>
                        <p  className="card__Description">typing....</p>
                    </div>
                </div>
             
                <div className="time">
                    10:20 PM
                </div>
                <div className="actionBtn">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>



            <div className="chartCard__Listing">
            <div className="card">
                <div className="card__det">
                    <div className="img__Container">
                     <img alt="image" src="data:image/png;base64,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" />
                    </div>
                    <div className="card__Detail">
                        <h5 className="title"> 
                            Node Js
                        </h5>
                        <p  className="card__Description">typing....</p>
                    </div>
                </div>
             
                <div className="time">
                    06:52 PM
                </div>
                <div className="actionBtn">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ChartCardListing
