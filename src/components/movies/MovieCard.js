import React,{useState,useEffect} from 'react'
import { Row, Card, Col,Badge} from 'react-bootstrap'
import {MovieList} from './MovieList';
import Filter from './Filter'
import NavBar from './../NavBar'
var axios = require("axios")
function MovieCard() {
    const [movie, setMovie] = useState([])
    const [rating, setRating] = useState(0);
    const [search, setSeach] = useState('');
    const [addedMovie, setAddedMovie] = useState({});
      useEffect(() => {
       setMovie(MovieList.movies)
       
      }, [])
      const eventhandler = data => setRating(data);
      const searchMovie = data => setSeach(data)
      const addedMovieCard = data => setAddedMovie(data) 
      
    //   if(MovieList.movies.length < movie){
    //       console.log(this.state.movie)
    //   }
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    useEffect(() => {
        setAddedMovie(JSON.parse(localStorage.getItem('MovieList')))
        if(addedMovie.length > movie.length){
            setMovie(addedMovie)
        }
    }, [])
    if(addedMovie){
        if(addedMovie.length > movie.length){
            setMovie(addedMovie)
        }
    }
    return ( 
        <div>
            <NavBar addMovieCard={addedMovieCard} movie={movie} search={searchMovie}/>
             <Filter onChange={eventhandler} />    
            <Row xs={1} md={4} className="g-4 m-2">
                {movie.map((movie, i) =>  {
                    if(search.length === 0 ){
                            if(movie.year >= '2012' && (movie.runtime / 20) >= rating ){
                                return (
                                    <div key={i} id={movie.id}>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={movie.posterUrl} />
                                                <Card.Body>
                                                <Card.Title>{movie.title}</Card.Title>
                                                <Card.Text>
                                                {/* {movie.summary = movie.summary.replace('<p>',''),
                                                movie.summary = movie.summary.replace('</p>',''),
                                                movie.summary = movie.summary.replace('<b>',''),
                                                movie.summary = movie.summary.replace('</b>',''),
                                                movie.summary = movie.summary.replace('</i>',''),
                                                movie.summary = movie.summary.replace('<i>',''), } */}
                                                {movie.plot}
                                            
                                                </Card.Text>
                                                </Card.Body>
                                                <Card.Footer className="text-muted"><Badge pill bg="success">{movie.genres.length? movie.genres.join(', '): 'Normal' }</Badge></Card.Footer>
                                                <Card.Footer className="text-muted"><Badge pill bg="danger">{movie.runtime? movie.runtime / 20 : 'Not rated'}</Badge></Card.Footer>
                                            </Card>
                                        </Col>
                                    </div>
                                    
                                )
                        }
                    }else{
                        if(movie.title.toLowerCase().includes(search.toLowerCase())){
                            if(movie.year >= '2012' && (movie.runtime / 20) >= rating ){
                                return (
                                    <div key={i} id={movie.id}>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={movie.posterUrl} />
                                                <Card.Body>
                                                <Card.Title>{movie.title}</Card.Title>
                                                <Card.Text>
                                                {/* {movie.summary = movie.summary.replace('<p>',''),
                                                movie.summary = movie.summary.replace('</p>',''),
                                                movie.summary = movie.summary.replace('<b>',''),
                                                movie.summary = movie.summary.replace('</b>',''),
                                                movie.summary = movie.summary.replace('</i>',''),
                                                movie.summary = movie.summary.replace('<i>',''), } */}
                                                {movie.plot}
                                            
                                                </Card.Text>
                                                <Card.Footer className="text-muted"><Badge pill bg="success">{movie.genres.length? movie.genres.join(', '): 'Normal' }</Badge></Card.Footer>
                                                <Card.Footer className="text-muted"><Badge pill bg="danger">{movie.runtime? movie.runtime / 20 : 'Not rated'}</Badge></Card.Footer>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </div>
                                    
                                )
                        }
                        }
                    }  
                })}
            </Row>
        </div>
    )
}

export default MovieCard
