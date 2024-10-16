import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PostsRq from './components/PostsRq';
import PostsTraditional from './components/PostsTraditional';
import PostDetailsRq from './components/PostDetailsRq';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
            <li>
              <Link to="/paginated-fruits">Fruits</Link>
            </li>
            <li>
              <Link to="/infinite-fruits">Infinite Fruits</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<PostsTraditional />} />
          <Route exact path='/rq-posts' element={<PostsRq />} />
          <Route exact path='/rq-posts/:postId' element={<PostDetailsRq />} />
          <Route exact path='/paginated-fruits' element={<PaginatedQueries />} />
          <Route exact path='/infinite-fruits' element={<InfiniteQueries />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;