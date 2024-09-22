import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { fetchUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/login', formData, { withCredentials: true });
      console.log(res);
      fetchUser();

      navigate('/'); // Navigate to the Home page after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <Header />
      <h2 className='text-success mt-4'>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}  className='fw-semibold '>
        <div>
          <label htmlFor="email" className="form-label mt-3">Email</label>
          <input type="email" name="email" className="form-control" onChange={onChange} placeholder='johndoe@gmail.com' required />
        </div>
        <div>
          <label htmlFor="password" className="form-label mt-3">Password</label>
          <input type="password" name="password" className="form-control" onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-success mt-3">Login</button>
      </form>
    </div>
  );
};

export default Login;
