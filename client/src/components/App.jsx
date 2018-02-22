import React, {Component} from 'react';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Navbar />
      </div>
    );
  }
}

export default App;