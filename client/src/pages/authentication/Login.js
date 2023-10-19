import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const Login = () => {
    const navigate = useNavigate();
    const [_, setCookies] = useCookies(['access_token']);

	const [data, setData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = 'https://nitrackeer-api/auth/login';
			const { data: res } = await axios.post(url, data);

			localStorage.setItem('token', res.data.token);
            setCookies('username', res.data.username);

            toast.success(`Successfully signed in as ${res.data.username}!`);
			navigate('/');
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.auth_container}>
			<div className={styles.auth_form_container}>
				<div className={styles.login_left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type='email'
							placeholder='Email'
							name='email'
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type='submit' className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.login_right}>
					<h1>New User?</h1>
					<Link to='/register'>
						<button type='button' className={styles.white_btn}>
							Sign Up!
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
