import App from "./app.jsx";
import {render} from "react-dom";
import './index.html';

render((
	App.routes
), document.getElementById('app'));
