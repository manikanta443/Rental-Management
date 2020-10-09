import React from 'react';
import { useHistory, Link } from "react-router-dom";
import data from '../../data/catalog.json';


function Header() {
    const history = useHistory();
    const locations = data.data.locations;

    const locationChangeHandler = (locationName, branchName) => {
        history.push({pathname:"/category",state:{locationName, branchName}});  
    }

    return (
        <header className="App-header">
          <div className="App-link">
            <Link to="/" className="link" >Renatal Management System</Link>  
          </div>
          <div className="main-menu">
            Select Location
            <ul id="nav">
              {
                locations.map(location => {
                  return (
                    <li key={location.name}>
                      <a>{location.name}</a>
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
    );
  }
  
  export default Header;