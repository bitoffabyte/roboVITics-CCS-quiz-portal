import { useState, useEffect, useRef } from 'react';
import './Styles/Quizportal.css';
import d from '../assets/down.svg';
import { quizData } from '../data';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Loader from 'react-loader-spinner';

// import img2e from '../img/img2e.png';
// import img4m from '../img/img4m.jpeg';
// import img9e from '../img/img9e.png';
// import img22e from '../img/img22e.jpg';
// import img25e from '../img/img25e.png';
// import img27l from '../img/img27l.png';
// import img30e from '../img/img30e.png';
import imgs from '../images-handler';
// import img from '../assets/landingPhoto.svg';
import img from '../assets/Hourglass.svg';
const Quiz = ({ auth }) => {
	Date.prototype.addHours = function (h) {
		this.setTime(this.getTime() + h * 60 * 60 * 1000);
		return this;
	};
	const history = useHistory();
	const [questions, updateQuestions] = useState('CSE');
	const [drop, updateDrop] = useState(false);
	const [loading, updateLoading] = useState(true);
	const [name, updateName] = useState('');
	const [regno, updateRegno] = useState('');

	const [time, updateTime] = useState({ min: 0, s: 0 });
	const [submit, updateSubmit] = useState(false);
	const [timeOver, updateTimeOver] = useState(false);
	const upload = useRef(null);
	const [err1, updateErr1] = useState('');
	const [err2, updateErr2] = useState('');

	const [subtime, updateSubTime] = useState({
		min: 0,
		s: 0,
	});
	const [testOver, updateTestOver] = useState(false);
	const subjects = ['Logic', 'CSE', 'Mechanical', 'Electrical', 'Management'];
	const [qpaper, updateQpaper] = useState({
		logic: [],
		cse: [],
		mech: [],
		elec: [],
		mgmt: [],
	});
	const qname = {
		Logic: 'logic',
		CSE: 'cse',
		Mechanical: 'mech',
		Electrical: 'elec',
		Management: 'mgmt',
	};
	const [txt, updateTxt] = useState('Select File');
	const mail = useRef('Name Lastname');
	const [pdf, updatepdf] = useState(null);
	const [fileName, updateFileName] = useState('');
	const startTime = useRef(null);
	const currentTime = useRef(null);

	// Upload Button Click =================================================================================================================================================================
	const uploadBtnClick = () => {
		if (txt === 'Select File') {
			upload.current.click();
		} else if (txt === 'Upload') {
			let s =
				name.replace(' ', '_').toUpperCase() +
				'_' +
				regno.toUpperCase() +
				'.pdf';
			if (
				pdf.name.toUpperCase() == s.toUpperCase() &&
				pdf.size / 1000000 <= 5
			) {
				const formData = new FormData();
				formData.append('file', pdf);
				formData.append('name', name);
				formData.append('regNo', regno);
				updateLoading(true);
				$.ajax({
					url: 'https://bubdup.robovitics.in/ans',
					type: 'POST',
					data: formData,
					processData: false,
					contentType: false,
					success: function (data) {
						updateLoading(false);
						history.push('/done');
					},
					error: () => {
						alert('Upload Failed Contact your mentor');
					},
				});
			}

			if (pdf.type != 'application/pdf') {
				updateTxt('Select File');
			}
			if (pdf.name.toUpperCase() != s.toUpperCase()) {
				updateErr1('Please name the file as ' + s);
				updateTxt('Select File');
			}
			if (pdf.size / 1000000 > 5) {
				updateErr1('Please keep the file below 5 mb');
				updateTxt('Select File');
			}
		}
	};
	// Upload =================================================================================================================================================================
	const getfile = (e) => {
		updateLoading(true);
		updatepdf(e.target.files[0]);
		updateFileName(e.target.files[0].name);
		updateLoading(false);
		updateTxt('Upload');
	};
	useEffect(() => {
		document.addEventListener('contextmenu', function (e) {
			e.preventDefault();
		});
		document.onkeydown = function (e) {
			if (e.keyCode == 123) {
				return false;
			}
			if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
				return false;
			}
			if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
				return false;
			}
			if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
				return false;
			}
			if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
				return false;
			}
			if (e.ctrlKey && e.shiftKey) {
				return false;
			}
			if (e.ctrlKey) {
				return false;
			}
			if (e.shiftKey) {
				return false;
			}
		};
		const uns = firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				history.push('/');
			} else {
				if (!auth) {
					history.push('/quiz');
				}
				mail.current = user.email;
				const det = { email: mail.current };
				$.post(
					'https://bubdup.robovitics.in/questions',
					det,
					(data, err) => {
						updateQpaper(data);
						updateLoading(false);
					}
				);
				$.post(
					'https://bubdup.robovitics.in/qdata',
					det,
					(data, err) => {
						// console.log(data == 'No record');

						const edate = new Date(data.start + '.000Z');
						const cdate = new Date(data.current + '.000Z');
						edate.addHours(1);
						startTime.current = new Date(data.start + '.000Z');
						startTime.current.addHours(1.25);
						currentTime.current = new Date(data.current + '.000Z');
						if (edate < cdate) {
							updateSubmit(true);
							stopTimerStartSubmit();
						}
						if (currentTime.current > startTime.current) {
							console.log(currentTime);
							console.log(startTime);
							history.push('/done');
						}
						let sec = 0;
						let min = 0;
						if (!submit) {
							let dif = Math.abs(cdate - edate) / 1000;
							let days = Math.floor(dif / 86400);
							dif -= days * 86400;
							let hours = Math.floor(dif / 3600) % 24;
							dif -= hours * 3600;
							let minutes = Math.floor(dif / 60) % 60;
							dif -= minutes * 60;
							let seconds = dif % 60;
							sec = seconds;
							min = minutes;
							updateTime({ min: min, s: sec });
						}
						updateName(data.name);
						updateRegno(data.regNo);
					}
				);
			}
		});
		return () => {
			uns();
			document.onkeydown = () => {};
		};
	}, []);

	const stopTimerStartSubmit = () => {
		let dif = Math.abs(startTime.current - currentTime.current) / 1000;
		let days = Math.floor(dif / 86400);
		dif -= days * 86400;
		let hours = Math.floor(dif / 3600) % 24;
		dif -= hours * 3600;
		let minutes = Math.floor(dif / 60) % 60;
		dif -= minutes * 60;
		let seconds = dif % 60;
		const sec = seconds;
		const min = minutes;
		updateTime({ s: sec, min: min });
		updateSubmit(true);
	};
	// TIMER =================================================================================================================================================================
	useEffect(() => {
		let myInterval = setInterval(() => {
			{
				if (time.s > 0) {
					updateTime({ ...time, s: Math.floor(time.s - 1) });
					currentTime.current.setTime(
						currentTime.current.getTime() + 1000
					);
				}
				if (time.s === 0) {
					if (time.min === 0) {
						if (!submit) {
							stopTimerStartSubmit();
							clearInterval(myInterval);
						} else {
							clearInterval(myInterval);
							history.push('/done');
						}
					} else {
						updateTime((prev) => ({
							min: prev.min - 1,
							s: 59,
						}));
						currentTime.current.setTime(
							currentTime.current.getTime() + 1000
						);
					}
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});
	// TIMER DISPLAY =================================================================================================================================================================
	const dispTime = () => {
		let s = '';
		if (time.min.toString().length < 2) {
			s = '0' + Math.floor(time.min);
		} else {
			s = Math.floor(time.min);
		}
		s += ':';
		if (time.s.toString().length < 2) {
			s += '0' + Math.floor(time.s);
		} else {
			s += Math.floor(time.s);
		}
		return s;
	};
	return (
		<div
			className='qp noselect'
			onClick={(e) => {
				// e.preventDefault();
			}}
		>
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
			{/* {loading ? (
				<p style={{ color: 'red', position: 'fixed' }}>loading</p>
			) : null} */}
			<div className='topp'>
				<div className='timer'>
					<img src={img} className='hr' />
					{dispTime()}
				</div>
				<div className='nln'>
					{name}
					<br />
					<button className='uploadBtn' onClick={uploadBtnClick}>
						{txt}
					</button>
					<br />
					<span className='nameOfFile'>{fileName}</span>
					<br />
					<span className='err1'>{err1}</span>
					<span className='err2'>{err2}</span>

					<input
						type='file'
						ref={upload}
						style={{ display: 'none' }}
						onChange={(e) => getfile(e)}
					/>
				</div>
			</div>
			<div className='quizBody'>
				{!submit ? (
					<>
						<div className='buttons'>
							{subjects.map((i) => (
								<button
									key={i}
									onClick={() => updateQuestions(i)}
									className={`${
										questions === i ? 'active' : 'btn'
									}`}
								>
									{i}
								</button>
							))}
						</div>
						<div className='dropdown'>
							<div
								className='dropdown-1'
								onClick={() => updateDrop((prev) => !prev)}
							>
								{questions}
								<img src={d} />
							</div>
							{drop ? (
								<div
									className={`${
										drop ? 'items itemss' : 'items itemsso'
									}`}
								>
									{subjects.map((i) => (
										<p
											key={i}
											onClick={() => {
												updateDrop(false);
												updateQuestions(i);
											}}
										>
											{i}
										</p>
									))}
								</div>
							) : null}
						</div>
					</>
				) : null}
				{!submit ? (
					<div className='portal'>
						<div className='paper'>
							{qpaper[qname[questions]]
								? qpaper[qname[questions]].map((i, index) => {
										return (
											<div className='qs'>
												<div className='qpp'>
													<div className='qno'>
														{index + 1}.
													</div>
													<div className='q'>
														<div className='qesb'>
															{i.q}
														</div>
														{i.i != ''
															? imgs(i.i)
															: null}

														{i.a ? (
															<div>{`A)  ${i.a}`}</div>
														) : null}
														{i.b ? (
															<div>{`B)  ${i.b}`}</div>
														) : null}
														{i.c ? (
															<div>{`C)  ${i.c}`}</div>
														) : null}
														{i.d ? (
															<div>{`D)  ${i.d}`}</div>
														) : null}
													</div>
												</div>
											</div>
										);
								  })
								: null}
						</div>
					</div>
				) : (
					<h1
						style={{
							position: 'fixed',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%,-50%)',
						}}
					>
						Please submit before timer runs out
					</h1>
				)}
			</div>
		</div>
	);
};

export default Quiz;
