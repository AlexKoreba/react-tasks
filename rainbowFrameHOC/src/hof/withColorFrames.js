export const withColorFrames = colors => Comp => props => {

    let component = <Comp {...props} />;

    [...colors].forEach( color => {
        
        return component = 
                            <div style={ {border: `solid 3px ${color}`, padding: "3px"} }>  
                                {component}   
                            </div>
        });

    return <>{component}</>;
};