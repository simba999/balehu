import React from 'react';

class Popup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				className=""
				style={{ 
					position: 'absolute',
					left: this.props.left,
					top: this.props.top
				}}>
				This is popup
			</div>
		);
	}
}

export default Popup;