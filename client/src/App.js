import React from 'react';
import axios from 'axios';
import { Form, Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import './App.css';

class App extends React.Component {
  state= {
    user: [],

  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/api/restricted/data')
    .then(res => {
      this.setState({ user: res.data })
    })
    .catch(err => {
      console.log('Sorry there was an error retrieving your data', err.response)
    })
  }
  
  render(){
    return (
      <div className="App">
        <h1>Username & Password Form</h1>
        <Form>
          <Field type="text" name="username" placeholder="Enter Username" />
          <ErrorMessage name="username" component="div" />
          <Field type="password" name="password" placeholder="Enter password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Submit</button>
        </Form>
        <div>
            <h2>Cooking Recipes</h2>
            {this.state.user.map(thing => (
              <div key={thing.name}>
                <h4>Course: {thing.course}</h4>
                <h5>{thing.name}</h5>
                <p>Technique: {thing.technique}</p>
              </div>
            ))}
        </div>
      </div>
  );
  }
}

const UserForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || '',
      password: password || ''
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter Username'),
    password: Yup.string().required('Please enter Password'),
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('http://localhost:5000/api/register', values)
      .then(res => {
        console.log(res.data)
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(App);

export default UserForm;
