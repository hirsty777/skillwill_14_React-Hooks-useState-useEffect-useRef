import { PureComponent } from "react";

// PureComponent prevents this component rendering when i change input values on parent component(addElelemnt)
class ToBeDone extends PureComponent{
    render(){
        const {name, id, action} = this.props;
        console.log("tobedone component")
        
        return(
            <div className="tbd-box">
                <div className="tbd">
                    <span className="tbd-text">{name}</span>
                    <button onClick={() => action(id)} className="tbd-btn">Done</button>
                </div>
            </div>
        )
    }
}

export default ToBeDone