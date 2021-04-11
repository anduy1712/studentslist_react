

import React from "react";

class TaskForm extends React.Component {

  constructor(){
      super();
      this.state = {
          Id: '',
          Name: '',
          Status: false,
      }
  }
  componentWillMount(){
    if(this.props.taskedit)
    {
      this.setState({
        Id: this.props.taskedit.Id,
        Name: this.props.taskedit.Name,
        Status: this.props.taskedit.Status,
      })
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps && nextProps.taskedit )
    {
      this.setState({
        Id: nextProps.taskedit.Id,
        Name: nextProps.taskedit.Name,
        Status: nextProps.taskedit.Status,
      })
    }
    else if(nextProps && nextProps.taskedit === null)
    {
      this.setState({
        Id: '',
          Name: '',
          Status: false,
      })
    }
   
  }



  closeForm = () =>{
      this.props.close()
  }
  onChangeValue = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    
    if(name == 'Status')
    {
        value = target.value == 'true' ? true : false;
    }
    this.setState({
        [name]: value,
    })
   
  }
  onSubmit = (e) =>{
    e.preventDefault();
    this.props.onSubmit(this.state)
    
  }




  render() {
    let {Id} = this.state;
      

      return (
                  
        <div className="panel panel-primary test">

            <div className="panel-heading">
              <h3 className="panel-title">{Id !== '' ? 'Update Work' : 'Add Work'}</h3>
              <span onClick={this.closeForm} className="glyphicon glyphicon-remove" aria-hidden="true"></span>

            </div>
            <div className="panel-body">
              
              <form onSubmit={this.onSubmit} >
                
              
                <div className="form-group">
                  <label >Name:</label>
                  <input value={this.state.Name} type="text" className="form-control" id="" name="Name" onChange={this.onChangeValue}   placeholder="Name..."/>
                </div>
                <div className="form-group">
                  <label >Status: </label>
                  
                  <select name="Status" onChange={this.onChangeValue} value={this.state.Status}  id="input" className="form-control" >
                    <option value={true}>Active</option>
                    <option value={false}>Hide</option>

                  </select>
                  
                </div>
                
                <button type="submit" className="btn btn-primary mr-8">Save</button>
                <button type="submit" className="btn btn-danger ">Cancel</button>
              </form>
              
            </div>
        </div>
   
      );
  }
}


export default TaskForm;
