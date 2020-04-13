import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recipe from './components/Recipe';
import RecipeList from './components/Test';
function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={Recipe}/>
      <Route path="/recipe/:id" component={Recipe}/>

     
    </div>
    </Router>
  );
}

export default App;
