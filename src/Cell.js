import React from "react";
import './Cell.css'

class Cell extends React.Component{

    static defaultProps = {
        IsLit : false
    }

    handleflipLights = () =>{
        this.props.flipLights();
    }
    render(){

        let classNames ='Cell' +  (this.props.isLit? ' isLit' : ' ');
        return(
            <div className={classNames} onClick={this.handleflipLights} ></div>
        )
    }
}
export default Cell;