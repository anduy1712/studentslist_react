import logo from './logo.svg';
import './App.css';

import React from "react";
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {findIndex, filter} from 'lodash';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      tasks: [],
      isDisplay: false,
      taskEdit: null,
      filter: {
        filterName: '',
        filterStatus: 0,
      },
      keyword: '',
      sort:{
        sortName: 'name',
        sortValue: 1,
      }
    }
  }


  //LOAD
  componentWillMount(){
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(localStorage && localStorage.getItem('tasks'))
    {
      this.setState({
        tasks: tasks,
      })
    }
  }
  //Create data
  onGeneralData = () => {
    const data = [
      {
        Id: this.generalID(),
        Name: 'anduy1712',
        Status: true,
      },
      {
        Id: this.generalID(),
        Name: 'lehuy27',
        Status: false,
      },
      {
        Id: this.generalID(),
        Name: 'justlecro',
        Status: true,
      },
    ]

    this.setState({
      tasks: data,
    })
    localStorage.setItem('tasks',JSON.stringify(data))
    
  }
  //random ID
  s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  
  generalID(){
    return this.s4() + this.s4() + this.s4() + this.s4(); // Example => 'e014026082e6237b'
  }
  //Open, close form 
  openWork = () => {
    this.setState({
      isDisplay: true,
      taskEdit: null
    })
  }
  closeWork = () => {
    this.setState({
      isDisplay: false,
    })
  }
  ToggleWork = () =>{
    this.setState({
      isDisplay: !this.state.isDisplay,
    })
  }

  //Submit form 
  onSubmit = (data) => {
    
     //this.state.tasks 
    var {tasks} = this.state;
    
    if(data.Id === '')
    {
      //add
      data.Id = this.generalID();
      tasks.push(data);
    }
    else{
      //edit
      const index = this.findIndex(data.Id);
      tasks[index] = data;
      
    }
    
    this.setState({
      tasks: this.state.tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    this.closeWork();
    
  }
  //delete
  onDelete = (id) =>{
    const {tasks} = this.state;
    const index = this.findIndex(id);
    if (index != -1)
    {
      tasks.splice(index,1);
      this.setState({
        tasks: tasks,
      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    

  }
  //updatestatus
  onUpdateStatus = (id) =>{
    
    const {tasks} = this.state;
    // const index = this.findIndex(id);
    const index = findIndex(tasks,(task)=>{
      return task.Id === id;
    })
    if (index != -1)
    {
      tasks[index].Status = !tasks[index].Status;
      this.setState({
        tasks: tasks,
      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  


  }
  //update profile
  onUpdateProfile = (id) =>{
    this.openWork();
    const {tasks} = this.state;
    // const index = this.findIndex(id);
    const index = findIndex(tasks,(task)=>{
      return task.Id === id;
    })
    const taskEdit = tasks[index];
    this.setState({
      taskEdit: taskEdit
    })
   
  }

  //filter 

  onFilter = (filterName,filterStatus) => {

    console.log(filterName,'---', filterStatus);
    this.setState({
      filter:{
        filterName: filterName.toLowerCase(),
        filterStatus: filterStatus,
      }
    })
  }
  //search
  onSearch = (keyword) =>{
    this.setState({
      keyword: keyword,
    })
  }
  //Sort
  onSort = (sortName,sortValue) => {
    // console.log(sortName);
    // console.log(sortValue);
    this.setState({
      sort:{
        sortName:sortName,
        sortValue: sortValue,
      }
    })
  }
  findIndex = (id)=>{
    const {tasks} = this.state;
    var result = -1;
    tasks.forEach((task,index) => {
      if(task.Id == id)
      {
        result = index;
        return result
      }
    })
    return result;
  }
  
  render() {
   
    var {tasks, isDisplay, taskEdit, filter, keyword,sort} = this.state;
    //Filter
    if(filter){
      if(filter.filterName)
      {
        tasks = tasks.filter((task) =>{
      
          return task.Name.toLowerCase().indexOf(filter.filterName) !== -1;
        })
      }
      tasks = tasks.filter((task) =>{
        if(filter.filterStatus === 0)
        {
          return task;
        }
        else{
          return task.Status === (filter.filterStatus === 1 ? true : false);
        }
        
      })
    }
    //Search
    if(keyword){
      tasks = tasks.filter((task) =>{
      
        return task.Name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      })
    }
    //Sort
    if(sort)
    {
      tasks = tasks.sort((a,b)=>{
        if(sort.sortName === 'name')
        {
          if(a.Name > b.Name) return sort.sortValue;
          else if(a.Name < b.Name) return -sort.sortValue;
        }
        else{ 
          if(a.Status > b.Status) return -sort.sortValue;
          else if(a.Status < b.Status) return sort.sortValue;
          else return 0;
        }
        
        



      })
    }

      return (

          <div className="container mt-8">
            
            <div className="row ">
                {isDisplay ? <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  {/* Form */}
                  <TaskForm taskedit={taskEdit} onSubmit={this.onSubmit} close={this.closeWork}/>
                   
                </div> : ''}
                
              <div className={isDisplay ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                
                <div className="panel panel-primary">
                    <div className="panel-heading">
                      <h3 className="panel-title">Work</h3>
                    </div>
                    <div className="panel-body">
                      {/* Add Work */}
                      <div style={{marginBottom: "10px",padding: "0px"}} className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              
                              <button type="button" className="btn btn-info mr-8" onClick={this.openWork}>Add Work</button>
                              <button type="button" className="btn btn-danger" onClick={this.onGeneralData}>General Data</button>

                      </div>
                       {/* Search - Sort */}
                       <Control search ={this.onSearch} sort={this.onSort}/>
                        
                       
                      
                      
                      
                      
                      <br/>
                      {/* Table */}
                      <TaskList 
                      updateprofile={this.onUpdateProfile} 
                      update={this.onUpdateStatus} 
                      delete={this.onDelete} 
                      filter={this.onFilter}
                      tasks={tasks}/>
                      
                        
                    </div>
                </div>
                
                
              </div>
            </div>
            
          </div>
          
        
        
      );
  }
}


export default App;
