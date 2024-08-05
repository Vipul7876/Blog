import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { About, BlogPage, Footer, Home, Login, MyBlogs, Navbar } from './Components/Exports';
import store from './Utils/Store';
import PrivateRoute from './Components/PrivateRoute';
import AdminLogin from './Components/Admin/Login';
import User_List from './Components/Admin/User_List';

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
          <Route path='/about' element={ <About /> } />
          <Route path='/admin' element={ <AdminLogin /> } />
          <Route path='/users-list' element={ <User_List /> } />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
