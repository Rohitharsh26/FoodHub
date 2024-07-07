import React from 'react';

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">

                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-item active">
                        <img src="https://images7.alphacoders.com/596/596343.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Slide 1" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpaperaccess.com/full/1598022.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Slide 2" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.viniscookbook.com/wp-content/uploads/2019/06/20190613_214607-1.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Slide 3" />
                    </div>
                </div>

                <div className="carousel-caption" style={{ zIndex: "9" }}>
                    <form className="d-flex justify-content-center">
                        <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                        <button className="btn text-white bg-success" type="submit">Search</button>
                    </form>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
