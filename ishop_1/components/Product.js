export let Product = React.createClass({

    displayName: 'Product',

    propTypes: {
        id: React.PropTypes.number,
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        img: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired
    },
  
    render: function(props) {
  
        return React.DOM.tr( 
            {className:'product'}, 

            React.DOM.td( null, 
                React.DOM.img( {src: this.props.img, alt: this.props.title} )
            ),
            React.DOM.td( null, 
                React.DOM.span( {className: 'product-title'}, this.props.title )
            ),
            React.DOM.td( null, 
                React.DOM.span( {className: 'product-price'}, this.props.price.toFixed(2) )
            ),
            React.DOM.td( null, 
                React.DOM.span( {className: 'product-amount'}, this.props.amount )
            )
        );
    }
});