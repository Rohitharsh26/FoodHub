import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: '9' }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn text-white bg-danger" onClick={() => setSearch('')}>
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://wallpaperaccess.com/full/1598022.jpg"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.viniscookbook.com/wp-content/uploads/2019/06/20190613_214607-1.jpg"
                className="d-block w-100"
                style={{ filter: 'brightness(50%)' }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images7.alphacoders.com/596/596343.jpg"
                className="d-block w-100"
                style={{ filter: 'brightness(50%)' }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://wallpaperaccess.com/full/1598022.jpg"
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="row mb-3">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr
                id="hr-success"
                style={{
                  height: '4px',
                  backgroundImage: '-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))',
                }}
              />
              {foodItems.length > 0 ? (
                foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                      <Card
                        foodName={filteredItem.name}
                        item={filteredItem}
                        options={filteredItem.options[0]}
                        ImgSrc={filteredItem.img}
                      />
                    </div>
                  ))
              ) : (
                <div>No Such Data</div>
              )}
            </div>
          ))
        ) : (
          <div>No Categories Available</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
