import { PureComponent } from "react";

// PureComponent prevents this component rendering when i change input values on parent component(addElelemnt)
class Done extends PureComponent{
    render(){
        const {name, id, actionReturn, actionRemove} = this.props;
        
        console.log("done component")
        return(
            <div className="done-box">
               <div className="done">
                    <span className="done-text">{name}</span>
                    <div className="btn-box">
                        <button onClick={() => actionReturn(id)} className="done-btn">Not Done</button>
                        <button onClick={() => actionRemove(id)} className="done-btn remove">Remove</button>  
                    </div>
               </div>
            </div>
        )
    }
}

export default Done