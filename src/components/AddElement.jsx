import { Component } from "react";
import Done from "./Done";
import ToBeDone from "./ToBeDone";
import addLogo from "../assets/arrow.svg"

class AddElement extends Component{
    state = {
        inputValue:"",
        toDoList:[],
        doneList:[],
        key:0,
        status:false
    };
    
    //get random todo when component is mounted
    componentDidMount(){
        console.log("component mounted")
        const randNum = Math.floor(Math.random()*10+1)
        fetch(`https://jsonplaceholder.typicode.com/todos/${randNum}`)
        .then(data => data.json())
        .then(res => this.setState({
            toDoList:[{id:this.state.key, name:res.title}],
            key:this.state.key+1
        }))
    }
    //if state status was changed fetch will be called from new
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.status !== prevState.status){
            console.log("component updated")
            const randNum = Math.floor(Math.random()*10+1)
            fetch(`https://jsonplaceholder.typicode.com/todos/${randNum}`)
            .then(data => data.json())
            .then(res => this.setState({
                toDoList:[...this.state.toDoList, {id:this.state.key, name:res.title}],
                key:this.state.key+1
            }))
        }
    }
    //change state status it will cause component update
    getRandomToDo  = () => {
        this.setState((prevState) => {
            return {status:!prevState.status}
        })
    }
    // change state.inputValue to value being entered in inputfield
    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    //add entered text to state toDoList when add button is clicked
    addToDo = (e) => {
        e.preventDefault();
        //prevent from empty entries
        if(this.state.inputValue.trim().length ===0 )return

        this.setState({
            toDoList:[...this.state.toDoList, {id:this.state.key, name:this.state.inputValue}],
            inputValue:"",
            key:this.state.key+1
        })
    };
    //when done btn is clicked add thet elemnt to state.doneList and then remove it from state.toDoList.
    changeList = (id) => {
        const finisehd = {
            id,
            name:this.state.toDoList.filter(el=> el.id === id)[0].name
        }
        const notFinished = this.state.toDoList.filter(el=> el.id !== id); 
        this.setState({
            doneList:[...this.state.doneList,finisehd],
            toDoList:[...notFinished]
        })
    };
    //when Not Done btn is clicked add thet elemnt to state.toDoList and then remove it from state.doneList.
    returnElement = (id) => {
        const notFinished = {
            id,
            name:this.state.doneList.filter((el) => el.id === id)[0].name
        }
        const finished = this.state.doneList.filter((el) => el.id !== id);
        this.setState({
            toDoList:[...this.state.toDoList, notFinished],
            doneList:[...finished]
        })
    }
    //remove elemnt from  this.state.doneList when remove btn is clicked.
    removeElement = (id) => {
        const onesLeft = this.state.doneList.filter(el=> el.id !== id); 
        this.setState({
            doneList:[...onesLeft],
        })
    };

    render(){   
        console.log("Render log")   
        return(
            <div className="wrapper">
                <div className="add-wrapper">
                <form onSubmit={this.addToDo} className="add-box">
                    <input type="text" onChange={this.onChange} value={this.state.inputValue} placeholder="Add New Task"/>
                    <button type="submit">
                    <img src={addLogo} alt="logo" />
                    </button>
                </form>
                <button onClick={this.getRandomToDo} className="random-btn">Random</button>
                </div>
                <div className="flex-box">
                    <h3>To Do List</h3>
                    {this.state.toDoList.map((el)=> (
                       <ToBeDone key={el.id} id={el.id} name={el.name} action={this.changeList}/>
                    ))}
                </div>
                <div className="flex-box">
                    <h3>Done List</h3>
                    {this.state.doneList.map((e)=> ( 
                       <Done key={e.id} id={e.id} name={e.name} actionReturn={this.returnElement} actionRemove={this.removeElement}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default AddElement