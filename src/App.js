import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

import Home from './components/home';
import Character from './components/character';
import { fetchCharacters } from './store/character';
import { CHARACTER_API_URL } from './api';

import 'antd/dist/antd.css';
import './App.css';

const { Content } = Layout;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch first 20 characters for the first time
    dispatch(fetchCharacters(CHARACTER_API_URL));

    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.getElementById('root').offsetHeight) {        
        dispatch(fetchCharacters());
      }
    });
  }, []);

  return (
    <Layout>
      <Content style={{ backgroundColor: 'white', paddingTop: 20 }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/character/:id'>
              <Character />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Layout>
  );
}

export default App;
