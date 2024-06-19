import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/NavBar';
import News from './Components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {

  apikey = process.env.REACT_APP_NEWS_API

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<News key ="general" apikey={this.apikey} pageSize={6} country="in" category="general" />} />
            <Route path="/business" element={<News key ="business" apikey={this.apikey} pageSize={6} country="in" category="business" />} />
            <Route path="/entertainment" element={<News  key ="entertainment" apikey={this.apikey} pageSize={6} country="in" category="entertainment" />} />
            <Route path="/general" element={<News  key ="general"  apikey={this.apikey} pageSize={6} country="in" category="general" />} />
            <Route path="/health" element={<News key ="health"  apikey={this.apikey} pageSize={6} country="in" category="health" />} />
            <Route path="/science" element={<News  key ="science" apikey={this.apikey} pageSize={6} country="in" category="science" />} />
            <Route path="/sport" element={<News  key ="sport" apikey={this.apikey} pageSize={6} country="in" category="sport" />} />
            <Route path="/technology" element={<News  key ="technology"  apikey={this.apikey} pageSize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
