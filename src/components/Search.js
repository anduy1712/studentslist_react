


import React from "react";

class Search extends React.Component {

  constructor(){
    super();
    this.state = {
      keyword:' ',
    }
  }
  onChange = (event) =>{
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value,
    });
    

  }
  onClick = () => {
    this.props.onsearch(this.state.keyword);
  }
  

  render() {
      return (
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">              
            <div className="input-group ">
                <input name="keyword" onChange={this.onChange}  type="text" className="form-control" placeholder="Search for..."/>
                <span className="input-group-btn">
                  <button onClick={this.onClick} className="btn btn-default" type="button">Search</button>
                </span>
            </div>
        </div>
      );
  }
}


export default Search;
