import React, { useState, useEffect, useRef } from "react";
import submit from "../assets/submit.svg";
import svg from "../assets/landingPhoto.svg";
import svg2 from "../assets/landingPhoto2.svg";
import help from "../assets/Help.svg";
import $ from "jquery";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Complete from "./Complete";
import "./Styles/Register.css";
import { chkUser } from "./Checks";
const Register = ({ mail, updateMail }) => {
	const [width, setWidth] = useState(window.innerWidth);
	const logo = useRef(svg);
	const phno = useRef();
	const reg = useRef();
	const rea = useRef();
	const namei = useRef();
	const history = useHistory();
	const [phck, updatePhck] = useState(true);
	const [nameck, updateNameck] = useState(true);
	const [rgck, updatergck] = useState(true);
	const [reck, updatereck] = useState(true);
	const [suc, updateSuc] = useState(false);
	const [helpp, updateHelp] = useState(false);
	console.log(mail);
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		const uns = firebase.auth().onAuthStateChanged(async (user) => {
			// console.log(user, "user");
			// if user
			if (!user) {
				history.push("/");
			} else {
				updateMail(user.email);

				try {
					//  = user.email;
					const asd = await chkUser(user.email, updateSuc);
					// if (asd) {
					// 	updateSuc(true);
					// }
				} catch (err) {
					// console.log(err);
				}
			}
		});
		return () => {
			uns();

			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const submitHandler = async (e) => {
		e.preventDefault();
		if (namei.current.value.split(" ") >= 1) updateNameck(false);
		else if (namei.current.value == "") updateNameck(false);
		else updateNameck(true);
		if (
			phno.current.value.length !== 10 ||
			!/^\d+$/.test(phno.current.value)
		) {
			updatePhck(false);
		} else {
			updatePhck(true);
		}
		if (
			!/20[A-Z][A-Z][A-Z]\d\d\d\d/.test(
				reg.current.value.toUpperCase()
			) ||
			reg.current.value.length !== 9
		) {
			updatergck(false);
		} else {
			updatergck(true);
		}
		if (
			rea.current.value.split(" ").length < 50 ||
			rea.current.value.split(" ").length > 200 ||
			rea.current.value.length > 2000
		) {
			updatereck(false);
		} else {
			updatereck(true);
		}
		if (
			phno.current.value.length === 10 &&
			/^\d+$/.test(phno.current.value) &&
			reg.current.value.length === 9 &&
			/20[A-Z][A-Z][A-Z]\d\d\d\d/.test(reg.current.value.toUpperCase()) &&
			!(
				rea.current.value.split(" ").length < 50 ||
				rea.current.value.split(" ").length > 200
			)
		) {
			const phone = phno.current.value;
			const regno = reg.current.value.toUpperCase();
			const reason = rea.current.value;
			const name = namei.current.value;
			const email = mail;
			const det = {
				name,
				email,
				phone,
				regno,
				reason,
			};
			console.log(det);
			$.post(
				"https://ccs-robovitics.herokuapp.com/register",
				det,
				(data, err) => {
					console.log(data, "data");
					console.log(err, "err");

					updateSuc(true);
				}
			);
		}
	};

	const handleResize = () => setWidth(window.innerWidth);
	if (width < 801) {
		logo.current = svg2;
	} else logo.current = svg;

	return suc ? (
		<Complete />
	) : (
		<div className='landing'>
			<div className='Rleft'>
				<h1>Register</h1>

				<div className='labb'>
					const [helpp, updateHelp] = useState(false);
					<h1 className='labbh1'>Register</h1>
					<h2>Fill the details carefully</h2>
					<br />
					<br />
					<form onSubmit={submitHandler}>
						<label className='formLabel'>Name</label>
						<span className='ermsg'>
							{!nameck ? (
								<>
									<br />
									<br />
									Enter Your Full Name
									{/* <br /> */}
								</>
							) : (
								""
							)}
						</span>

						<br />
						<input
							autoComplete='off'
							type='text'
							className={`${nameck ? "input1" : "input1 er"}`}
							placeholder='Name'
							ref={namei}
							name='Name'
						/>
						<br />
						<br />
						<label className='formLabel'>Phone Number</label>
						<br />
						<span className='ermsg'>
							{!phck ? (
								<>
									<br />
									Enter a valid Phone Number
									{/* <br /> */}
								</>
							) : (
								""
							)}
						</span>

						<br />
						<input
							autoComplete='off'
							type='tel'
							className={`${phck ? "input1" : "input1 er"}`}
							placeholder='Valid 10 digit number'
							ref={phno}
							name='phone'
						/>
						<br />
						<br />
						<label className='formLabel'>Registration Number</label>
						<br />

						<span className='ermsg'>
							{!rgck ? (
								<>
									<br />
									Enter a valid Registration Number
									{/* <br /> */}
								</>
							) : (
								""
							)}
						</span>
						<br />
						<input
							autoComplete='off'
							type='text'
							className={`${rgck ? "input1" : "input1 er"}`}
							placeholder='Ex:-20BCE0000'
							ref={reg}
							name='regno'
							// style={{ textTransform: "uppercase" }}
						/>

						<br />
						<br />
						<label className='formLabel'>
							Why do you want to join RoboVITics?
						</label>
						<br />

						<span className='ermsg'>
							{!reck ? (
								<>
									<br />
									Please keep it 50 - 200 words
									{/* <br /> */}
								</>
							) : (
								""
							)}
						</span>
						<br />
						<textarea
							type='text'
							className={`${reck ? "input3" : "input3 er"}`}
							placeholder='Answer in 50-200 words'
							ref={rea}
							name='reason'
						/>

						<br />
						<br />
						<button className='bbb'>
							<img
								src={submit}
								className='submitBtn'
								alt='submit button'
							/>
						</button>
					</form>
				</div>
			</div>
			<div className='right'>
				<div className='rab'>
					<img src={logo.current} className='foto' alt='cool-img' />
				</div>
				{/* <img src={logo.current} className='foto' /> */}

				<h1 className='ccs'>Fill the details carefully</h1>
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
						className={`${!helpp ? "helpimg" : "helpimg hell"}`}
					/>
					<div
						className={`${helpp ? "backdrop" : ""}`}
						onClick={() => updateHelp(false)}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Register;
