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
		'Make sure that you attempt the exam from a laptop/desktop and have good internet connectivity. ',
		'The duration of the test is 1 hour. An additional 15 minutes will be provided at the end for uploading the answer script. No extra time will be provided.',
		'No change of slots will be entertained (under critical circumstances get in touch with your mentors).',
		'No malpractices should be followed while giving the exam. Anyone found doing so will be debarred from the exam.',
		'In case, any issues are faced while attempting the exam, the assigned mentor only should be contacted.',
		'There are multiple sections in the test. It is mandatory to attempt the Management and logical reasoning sections and at least one of the three technical sections provided (CSE, Electrical , Mechanical). You can attempt multiple sections.',
		'For MCQs, write down the option as well as the answer clearly [ex: b) python].',
		'Answers should be written on paper only, scanned (as a pdf)  and uploaded with the name of the file in the following format: FirstName_LastName_RegistrationNumber.pdf.',
		'If file upload is not working, contact your mentor within the 15 min upload time',
	];
	const handleClick = () => {
		updateLoading(true);
		if (pass == 'O@t4F^s8N!)') {
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
			updateEr(false);
			updateAuth(true);
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
			<div className='landing qlanding'>
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
						<img src={svg} className='foto fotoo foto2 foto3' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
