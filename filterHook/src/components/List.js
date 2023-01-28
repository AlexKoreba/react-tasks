import PropTypes from "prop-types";

const List = ( {wordsList} ) => {
    return ( 
        <div className="content">
            <ul>
                {wordsList.map( word => <li key={word}>{word}</li> )}
            </ul>
        </div>
    );
};

List.propTypes = {
    wordsList: PropTypes.arrayOf(PropTypes.string).isRequired
};
 
export default List;