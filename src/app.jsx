import React from 'react';
import {render} from 'react-dom';
import ExampleComponent from './components/example/example.jsx';
import HeaderComponent from './components/header/header.jsx';

let styles = {
	color: 'green',
	backgroundColor: 'red'
};

class App extends React.Component {
	render() {
		return (
			<div>
				<HeaderComponent/>
				
				<p style={styles}> Hello React!</p>
				<ExampleComponent/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));