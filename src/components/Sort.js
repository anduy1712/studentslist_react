


import React from "react";

class Sort extends React.Component {

  constructor(){
    super();
    this.state = {
      sortName: 'name',
      sortValue: 1,
    }
  }
  
  onClick = (sortName, sortValue) => {
    this.setState({
      sortName: sortName,
      sortValue: sortValue,
    })
    this.props.onsort(sortName,sortValue);
    
  }

  render() {
   
      let {sortName,sortValue} = this.state;

      return (        
        <div  className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Arrange 
                <span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li onClick={() => this.onClick('name',1)}>
                    
                    <a  href="#">Name: A-Z</a>
                    {(sortName === 'name' && sortValue === 1) ? <span className="glyphicon glyphicon-ok"></span> : '' }
                    {/* <span className="glyphicon glyphicon-ok"></span> */}
                  </li>

                  <li onClick={() => this.onClick('name',-1)}>
                      <a href="#">Name: Z-A</a>
                      {(sortName === 'name' && sortValue === -1) ? <span className="glyphicon glyphicon-ok"></span> : '' }
                  </li>

                  <li onClick={() => this.onClick('status',1)}>
                    <a href="#">Status: Active</a>
                    {(sortName === 'status' && sortValue === 1) ? <span className="glyphicon glyphicon-ok"></span> : '' }
                  </li>

                  <li onClick={() => this.onClick('status',-1)}>
                       <a href="#">Status: Deadactive</a>
                       {(sortName === 'status' && sortValue === -1) ? <span className="glyphicon glyphicon-ok"></span> : '' }
                  </li>

                </ul>
            </div>
        </div>
      );
  }
}


export default Sort;
