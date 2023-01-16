export const withColorFrames = colors => Comp => function WithColorFrames(props) {

    let component = <Comp {...props} />;

    [...colors].forEach( color => {
        
        return component = 
                            <div style={ {border: `solid 3px ${color}`, padding: "3px"} }>  
                                {component}   
                            </div>
        });

    return component;
};