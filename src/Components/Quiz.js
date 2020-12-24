import { useEffect, useState, useRef } from 'react';
import Loader from 'react-loader-spinner';

import './Styles/Landing.css';
import { useHistory } from 'react-router-dom';
import img from '../assets/robovitics.png';
import google from '../assets/signin.svg';
import svg from '../assets/landingPhoto.svg';
import svg2 from '../assets/landingPhoto2.svg';
import help from '../assets/Help.svg';
import firebase from 'firebase';
import { signIn } from '../firebase-codes';
import { Redir } from '../HandleRedir';
import './Styles/Quiz.css';
import { quizData } from '../data';
import $ from 'jquery';

// import firebase from 'firebase';

const Landing = ({ updateMail, updateAuth }) => {
	const history = useHistory();
	const [pass, updatePass] = useState('');
	const [er, updateEr] = useState(false);
	const [loading, updateLoading] = useState(true);
	const mail = useRef('');
	// const [fb, ufb] = useState(firebase.auth().currentUser.email);
	const rules = [
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	];
	const handleClick = () => {
		updateLoading(true);
		if (pass === '') {
			updateEr(false);
			updateAuth(true);
			const det = { email: mail.current };
			$.post(
				'https://bubdup.robovitics.in/setstart',
				det,
				(data, err) => {
					console.log(data, 'data');
					console.log(err, 'err');
					updateLoading(false);

					history.push('/quizportal');
				}
			);
		} else {
			updateEr(true);
			updateLoading(false);
		}
	};

	useEffect(() => {
		const uns = firebase.auth().onAuthStateChanged(async (user) => {
			// console.log(user, "user");
			// if user
			if (!user) {
				history.push('/');
			} else {
				mail.current = user.email;
				updateLoading(false);
				console.log(mail);
			}
		});
		return () => {
			uns();
		};
	}, []);
	return (
		<div className='asddsaaa'>
			{loading ? (
				<div className='model'>
					<Loader
						type='BallTriangle'
						color='#00BFFF'
						height={100}
						width={100}
						className='aaa'
					/>
				</div>
			) : null}
			<div className='head'>
				<span className='name'>{mail.current}</span>
				<br />
			</div>
			<div className='landing qlanding' style={{ overflow: 'visible' }}>
				<div className='left qleft'>
					<div className='lab qlab'>
						<span className='rules'>Rules</span>
						<br />
						<span className='rulesdes'>
							Read the following carefully.
						</span>
						<ul>
							{rules.map((i, index) => (
								<li key={index}>{i}</li>
							))}
						</ul>
						<button className='startBtn' onClick={handleClick}>
							Start the quiz
						</button>{' '}
						<input
							type='text'
							className='pwd'
							value={pass}
							onChange={(e) => updatePass(e.target.value)}
							placeholder='Enter your password'
						></input>
						<br />
						{er ? (
							<span className='ermsg-pwd'>
								Password does not match the time slot
							</span>
						) : null}
					</div>
				</div>
				<div className='right qright'>
					<div className='rab'>
						<img src={svg} className='foto fotoo foto2' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
