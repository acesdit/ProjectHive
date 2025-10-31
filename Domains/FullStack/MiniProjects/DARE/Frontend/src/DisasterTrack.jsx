import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./index.css";
function DisasterTrack() {
  const [disasterData, setDisasterData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/admindisaster");
      const data = await response.json();
      setDisasterData(data);
      setTotalItems(data.length); // Update the totalItems state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Navbar />
      {/* <div role="alert" className="alert shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold text-red-500 animate-blink">
            New disaster alert!
          </h3>
          <div className="text-xs overflow-hidden">
            <div className="overflow-hidden">
              <p className="text-xs whitespace-nowrap animate-scroll scroll-left">
                ****** 3.8 Magnitude | Churachandpur, Manipur | 13 Mar 2024
                13:50:58 ******
              </p>
            </div>
          </div>
        </div>
      </div>
      <div role="alert" className="alert shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold text-red-500 animate-blink">
            New disaster alert!
          </h3>
          <div className="text-xs overflow-hidden">
            <div className="overflow-hidden">
              <p className="text-xs whitespace-nowrap animate-scroll scroll-left">
                ****** 4.2 Magnitude | Andaman Sea | 12 Mar 2024 23:32:00******
              </p>
            </div>
          </div>
        </div>
      </div>

      <div role="alert" className="alert shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold text-red-500 animate-blink">
            New disaster alert!
          </h3>
          <div className="text-xs overflow-hidden">
            <div className="overflow-hidden">
              <p className="text-xs whitespace-nowrap animate-scroll scroll-left">
                ****** 3.9 Magnitude | Afghanistan | 12 Mar 2024 22:26:01******
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="bg-blue-50">
        <div role="alert" className="alert shadow-lg p-4 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold text-red-500 animate-blink">
              New disaster alert!
            </h3>
            {/* <div className="text-xs overflow-hidden">
            <div className="overflow-hidden">
              <p className="text-xs whitespace-nowrap animate-scroll scroll-left">
                ****** 4.0 Magnitude | West Garo Hills, Meghalaya | 12 Mar 2024
                14:27:53******
              </p>
            </div>
          </div> */}
          </div>
        </div>
        <div className="flex justify-center mb-8 mt-8">
          <div className="carousel h-auto item max-w-md mx-auto">
            <div id="slide1" className="carousel-item relative ">
              <img
                src="https://www.himachalheadlines.com/wp-content/uploads/2023/01/IMG-20230113-WA0006-800x445.jpg.webp"
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-8103076-376-8103076-1595253690634.jpg"
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="https://s.w-x.co/util/image/w/in-rains_delhi.jpg?crop=16:9&width=480&format=pjpg&auto=webp&quality=60"
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img
                src="https://cdn.siasat.com/wp-content/uploads/2021/07/Heatwave.jpg "
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide5" className="carousel-item relative w-full">
              <img
                src="https://www.science.org/do/10.1126/science.abf0544/full/Califire_1280p_2-1644908599597.jpg"
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide6" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide6" className="carousel-item relative w-full">
              <img
                src="
https://images.cnbctv18.com/wp-content/uploads/2023/02/Turkey-Earthquake-2-Source-Reuters-.jpg"
                className="w-full"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <ul className="timeline timeline-vertical">
          <li>
            <div className="timeline-start timeline-box">
              Avalanche in Kinnaur, Kullu, Lahul, Spiti districts of Himachal
              Pradesh
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-start timeline-box">
              Thunderstorm with lightning in Jhagram district of West Bengal
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-start timeline-box">
              Light rain in Jaiur, Alwar, Bharatpur
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-start timeline-box">
              Heat wave in Visakhapatnam of Andhra Pradesh
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-start timeline-box">
              Pre-fire alert in Madhya Pradesh
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-start timeline-box">
              Pre-fire alert in Mizoram, Maharashtra
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
        </ul> */}
        <div className="flex justify-center ml-96 p-6 pt-4">
          <ul className="timeline timeline-vertical">
            {disasterData.map((item, index) => (
              <li key={index}>
                <div className="timeline-start timeline-box">
                  {item.type} in {item.location}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DisasterTrack;
