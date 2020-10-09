import React from 'react';
import './App.css';
import {useRoutes} from 'hookrouter';

import Home from './components/Home';
import Header from './components/common/AppHeader';
import Footer from './components/common/AppFooter';
import CategoryList from './components/CategoryList';
import SubCategoryList from './components/SubCategoryList';

function App(props) {

  const routes = {
    "/": () => <Home />,
    "/category": () => <CategoryList {...props}/>,
    "/sub-category": () => <SubCategoryList />
  };
  const routeResult = useRoutes(routes)

  return (
    <div className="App">  
      <Header/>
      <div className="main-content">
      {routeResult}
      </div>  
      <Footer/>
    </div>
  );
}

export default App;
