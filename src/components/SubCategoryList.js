import React,{useState, useEffect} from 'react';
import data from '../data/catalog.json';
import {  useLocation } from "react-router-dom";


function CategoryList() {
  const location = useLocation();
  const myparam = location.state;
  const [categoryDetails, setCategoryDetails] = useState({});
  const [suCategoryDetails, setSubCategoryDetails] = useState({});

  useEffect(() => {
    setCategoryDetails({...categoryDetails,...myparam});
  },[myparam]);
  
  useEffect(() => {
    const getSubCategories = async() => {
      const locations = data.data.locations;
      const branchObj = locations && await locations.find(location => location.name === categoryDetails.locationName);
      const categoryObj  = branchObj &&  await branchObj.branches.find(branch => branch.name === categoryDetails.branchName);
      const subCategoryObj= categoryObj &&  await categoryObj.categories.find(category => category.name === categoryDetails.categoryName);

      subCategoryObj && setSubCategoryDetails(subCategoryObj) 
    }
    getSubCategories();
  },[categoryDetails]);

  return (
    <div>
      <h3>Equipment Catalog / {categoryDetails.categoryName}</h3>
      <div className="row">
        {
            suCategoryDetails && Array.isArray(suCategoryDetails.subcategories)  && suCategoryDetails.subcategories.map(subcategory => {
              return (
              <div className="column" key={subcategory.name}>
                <div className="card">
                <img src={`../../images/subcategory/${subcategory.image}`} alt="Avatar" style={{width:'100%'}} />
                  <div className="container">
                    {subcategory.name}
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