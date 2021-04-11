import React from "react";


class TaskItem extends React.Component {

  constructor(){
    super();
    
    
  }
  //UpdateStatus
  onUpdate = () => {
    var id = this.props.id
    this.props.update(id)
  }
  //Delete
  onDelete = () => {
    var id = this.props.id
    this.props.delete(id)
  }
  //UpdateProfile
  onUpdateProfile = () => {
    var id = this.props.id
    this.props.updateprofile(id);
  }



  render() {
    var {task} = this.props;
      

      return (
        <tr key={this.props.index} className="text-center">
                <td>{this.props.index +1}</td>
                <td>{this.props.name}</td>
                <td>
                {this.props.status === true ?  <span onClick={this.onUpdate} className="label label-success">Hide</span> : <span onClick={this.onUpdate}  className="label label-danger">Active</span>}
                
                
               
                
                
                </td>
                <td>
                  <button onClick={this.onUpdateProfile} type="button" className="btn btn-primary mr-8">Edit</button>                              
                  <button onClick={this.onDelete} type="button" className="btn btn-danger">Delete</button> 
                </td>

        </tr>
        
      );
  }
}


export default TaskItem;
