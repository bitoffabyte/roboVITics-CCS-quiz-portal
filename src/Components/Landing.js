import { useEffect, useState, useRef } from 'react';
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
import Loader from 'react-loader-spinner';

const Landing = ({ updateMail }) => {
	const history = useHistory();
	const [width, setWidth] = useState(window.innerWidth);
	const [auth, updateAuth] = useState(false);
	const [helpp, updateHelp] = useState(false);
	const [loading, updateLoading] = useState(false);
	// const [mail, updateMail] = useState("");

	const logo = useRef(svg);
	const handleResize = () => setWidth(window.innerWidth);
	if (width < 801) {
		logo.current = svg2;
	} else logo.current = svg;

	useEffect(() => {
		firebase.auth().signOut();

		const uns = firebase.auth().onAuthStateChanged((user) => {
			updateLoading(false);

			updateAuth(!!user);
			// console.log(user, "asd");

			if (user) {
				updateMail(user.email);

				if (history.location.pathname == '/') {
					if (Redir(user.email)) {
						history.push('/quiz');
						// console
					} else {
						// firebase.auth().signOut();
						history.push('/error');
					}
				}
			}
		});
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			uns();
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='landing' style={{ overflow: 'auto' }}>
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
			<div className='left'>
				<div className='lab'>
					<img src={img} className='roboLogo' />
					<br />
					<br />
					<br />
					<img
						src={google}
						className='signinbtn'
						onClick={() => {
							updateLoading(true);
							signIn(updateLoading);
							updateLoading(false);
						}}
					/>
					<br />
					<span className='vitE'>
						Please sign in with VIT e-mail ID
					</span>
				</div>
			</div>
			<div className='right'>
				<div className='rab'>
					<img src={logo.current} className='foto fotoo' />
				</div>
				{/* <img src={logo.current} className='foto' /> */}

				<span className='lccs'>Core Committee Selection 2020</span>
			</div>
			<div className='helpStuff'>
				<span
					className='help'
					onClick={() => updateHelp((prev) => !prev)}
				>
					Help?
				</span>
				<br></br>
				<img
					src={help}
					className={`${!helpp ? 'helpimg' : 'helpimg hell'}`}
				/>
				<div
					className={`${helpp ? 'backdrop' : ''}`}
					onClick={() => updateHelp(false)}
				></div>
			</div>
		</div>
	);
};

export default Landing;
