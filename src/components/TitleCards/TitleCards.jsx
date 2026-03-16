import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjQ1MTc3M2U4N2IxNmVjYjJlYWRhNmJiZDdiY2MyNyIsIm5iZiI6MTc3MzU5ODk3OS40MDcsInN1YiI6IjY5YjZmOTAzMjlkMjMzNTY3NDY3M2M1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C6n3ho1gcUAHAH9_VRbNt32AeDvfJvISBBmDti2Mmnk",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`}  className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default TitleCards