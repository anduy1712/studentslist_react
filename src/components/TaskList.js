

import React from "react";
import TaskItem from "./TaskItem";

class TaskList extends React.Component {

  constructor(){
    super();
    this.state = {
      filterName: '',
      filterStatus: 0,
    }
  }
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: target.name === 'filterStatus' ? +value : value,
    })
    this.props.filter(name === "filterName" ? value : this.state.filterName,name === "filterStatus" ? +value : this.state.filterStatus);
    
  }

  render() {
      var {tasks} = this.props;
      var element = tasks.map((task,index) =>{
        return <TaskItem updateprofile={this.props.updateprofile} update={this.props.update} delete={this.props.delete} key={task.Id} id={task.Id} index={index} name={task.Name} status={task.Status}/>
      })

      return (
        <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>

              <tr  className="text-center">
                <td></td>
                <td>
                  <input name="filterName" onChange={this.onChange}  type="text" className="form-control" placeholder="Search for..."/>
                </td>
                <td>
                  
                  <select name="filterStatus" onChange={this.onChange} id="input" className="form-control" required="required">
                    <option value={0}>All</option>
                    <option value={1}>Active</option>
                    <option value={-1}>Deadactive</option>
                  </select>
                  
                </td>
                

              </tr>
              {element}

            </tbody>
        </table>
        
      );
  }
}


export default TaskList;
