import React,{useRef,useState} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {Form,FormControl,Button,Container,Modal} from 'react-bootstrap'
import {MovieList} from './movies/MovieList'

function NavBar(props) {
    let nameRef = useRef();
    // we are referring to input to change the value
   const searchInput = () => {
            props.search(nameRef.current.value);
    };
    function Example() {
        const [field, setField] = useState([]);
        const [newmovies, setNewMovies] = useState({});
        const [show, setShow] = useState(false);
        const onFormSubmit = e => {
            e.preventDefault();
            const formData = new FormData(e.target),
                formDataObj = Object.fromEntries(formData.entries())
                formDataObj.genres = field
                formDataObj.year = new Date().getFullYear()
                formDataObj.id = MovieList.movies.length
                formDataObj.runtime = formDataObj.runtime * 20
                setNewMovies(formDataObj)
                let newlist = JSON.parse(localStorage.getItem('MovieList'))
                newlist.push(formDataObj)
                MovieList.movies.push(newlist);
                localStorage.setItem('MovieList', JSON.stringify(newlist));
                window.location.reload();
        }
        
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
          <>
            <Nav.Link href="#" onClick={handleShow}>Add Movie Card</Nav.Link>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Movie Card</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Movie title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Movie title" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Movie genres</Form.Label>
                    <br/>
                    <Form.Text id="passwordHelpBlock" muted>
                        Your must click sur Ctrl to multiple selections.
                    </Form.Text>
                    <Form.Select multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                        <option disabled>Select genres</option>
                        {MovieList.genres.map((genres, index) =>
                            <option key={index} value={genres}>{genres}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Movie image</Form.Label>
                    <Form.Control type="text" name="posterUrl" placeholder="Movie image" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Movie rating</Form.Label>
                    <Form.Control type="number" maxvalue="10" name="runtime" placeholder="rating/10" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Movie description</Form.Label>
                    <Form.Control as="textarea" name="plot" placeholder="Movie Description" rows={3} />
                </Form.Group>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleClose}>
                  Add Movie
                </Button>
              </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        );
      }
    return (
        <div>
            <Navbar bg="primary" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                    >
                        <Nav.Link href="#action1"><Example /></Nav.Link>
                    </Nav>
                    <Form className="d-flex flex-lg-row">
                        <FormControl
                        type="search"
                        placeholder="Search by name"
                        className="me-2"
                        aria-label="Search"
                        ref={nameRef}
                        onInput={()=> searchInput()}
                        />
                    </Form>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </div>
    )
}

export default NavBar
