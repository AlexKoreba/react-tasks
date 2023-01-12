import "./RainbowFrame.css";

const RainbowFrame = (props) => {

    let cld = props.children;

    [...props.colors].reverse().forEach( color => {
        
        return cld = 
                    <div style={ {border: "solid 2px " + color, padding: "2px"} }>  
                        {cld}   
                    </div>
    })

    return ( 
        <div>{cld}</div>
    );
}
 
export default RainbowFrame;