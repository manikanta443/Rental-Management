import React, { useState,useEffect } from 'react';
import data from '../data/catalog.json';
import { useLocation, useHistory } from "react-router-dom";


function CategoryList(props) {
  console.log(props);
  const location = useLocation();
  const history = useHistory();
  const myparam = location.state;
  const [locationDetails, setLocationDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});

  useEffect(() => {
    console.log("useEffect called");
    setLocationDetails({...locationDetails,...myparam});
  },[myparam]);


  useEffect(() => {
    const getCategories = async() => {
      const locations = data.data.locations;
      debugger;
      console.log(locationDetails,"locationDetails")
      const branchObj = locations && await locations.find(location => location.name === locationDetails.locationName);
      const categoryObj= branchObj &&  await branchObj.branches.find(branch => branch.name === locationDetails.branchName);
      categoryObj && setCategoryDetails(categoryObj) 
    }
     getCategories();
  },[locationDetails]);

  const categoryClickHandler = (categoryName) => {
    console.log(props);
    // props.location.push({pathname:'/sub-category', state:{subcategory : category.subcategories}});
    // useRedirect('/sub-category');
    history.push({pathname:"/sub-category",state:{...locationDetails,categoryName}});

  }
  
  return (
    
    <div>
        <h3>Equipment Catalog </h3>
        <div class="row">
        {
           categoryDetails && Array.isArray(categoryDetails.categories)  && categoryDetails.categories.map(category => {
             return (
              <div class="column">
                <div class="card" onClick={()=>categoryClickHandler(category.name)}>
                <img src={`../../images/category/${category.image}`} alt="Avatar" style={{width:'100%'}} />
                  <div class="container">
                    {category.name}
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
    </div>
  );
}

export default CategoryList;