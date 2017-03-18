import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './Navbar';
import Footer from './Footer'
import learn from './learn';
import myVocabs from './myvocabs';
import profile from './profile'
import { Router, Route,Link,browserHistory } from 'react-router'

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={learn} />
		<Route path="/myvocabs" component={myVocabs} />
		<Route path="/profile" component={profile} />
	</Router>
	), document.getElementById('content')
);
ReactDOM.render(
  <Navbar />,
  document.getElementById('navbar')
);
ReactDOM.render(
  <Footer />,
  document.getElementById('footer')
);