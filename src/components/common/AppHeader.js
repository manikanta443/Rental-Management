import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import '../../App.css';
import data from '../../data/catalog.json';


function Header(props) {
    const history = useHistory();
    const locations = data.data.locations;
    const [loc, setLoc] = useState(''); 

    const locationChangeHandler = (locationName, branchName) => {
        
        history.push({pathname:"/category",state:{locationName, branchName}});
        
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-link">Renatal Management System</div>
          <div className="main-menu">
            Select Location
          <ul id="nav">

          {
            locations.map(location => {
              return (
                <li>
                  <a key={location.name} >{location.name}</a>
                  <ul>

                    {
                      location.branches.map(branch => {
                        return (
                          <li onClick={ ()=>locationChangeHandler(location.name,branch.name)} key={branch.name} ><a>{branch.name}</a></li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }           
          </ul>
          </div>
          
        </header>
      </div>
    );
  }
  
  export default Header;