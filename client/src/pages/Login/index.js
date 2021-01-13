import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../../components/Alert';
import TextInput from '../../components/TextInput';
import { post } from '../../utils/ajax';
import { setUser } from './actions';
import Button from '../../components/Button';
import { isEmpty } from 'lodash';
import Layout from '../../components/Layout';

const Login = ({ dispatchUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const history = useHistory();
  const isValidForm = !isEmpty(email) && !isEmpty(password);

  const login = async () => {
    setLoading(true);
    setAlert({});

    const data = { email, password };
    const response = await post('auth/login', data);

    setLoading(false);

    if (response.success) {
      localStorage.setItem('token', response.token);
      dispatchUser({ ...response.user, isAuth: true });
      history.push('/');
    } else {
      setAlert({ type: 'danger', message: response.msg });
    }
  };

  return (
    <Layout title="Log in">
      <div className="col-6 m-auto">
        <Alert {...alert} />
        <TextInput
          id="email"
          type="email"
          label="E-mail"
          placeholder="test"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <TextInput
          id="password"
          type="password"
          label="Password"
          placeholder="pass123"
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <div className="mt-2">
          <Button
            value="Log in"
            onClick={login}
            disabled={loading || !isValidForm}
          />
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
