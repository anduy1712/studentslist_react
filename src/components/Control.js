

import Search from './Search';
import Sort from './Sort';

import React from "react";


class Control extends React.Component {

  constructor(){
    super();
    
  }
  
  

  render() {
   
      

      return (
                  
        <div className="row">
        {/* Search */}
        <Search onsearch={this.props.search}/>
        
        {/* Sort */}
        <Sort onsort={this.props.sort}/>
        
        </div>
   
      );
  }
}


export default Control;
