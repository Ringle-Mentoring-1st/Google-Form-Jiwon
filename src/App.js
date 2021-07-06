import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CreateForm from './pages/CreateForm';

function App() {
  const history = useHistory()
  const userId = useSelector(state => state.user.userId);

  useEffect(() => {
    if (!userId) {
      history.push('/login');
    }
  }, [userId]);

  return (
      <div className="App">
        {userId?
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/create/form" component={CreateForm} />
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
        }
      </div>
  );
}

export default App;