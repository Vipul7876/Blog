import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BlogPage, Home, Login, MyBlogs, Navbar } from './Components/Exports';
import store from './Utils/Store';
import PrivateRoute from './Components/PrivateRoute';

function App () {

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/myblogs' element={ <PrivateRoute element={ <MyBlogs /> } /> } />
          <Route path='/blog/:id' element={ <BlogPage /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
