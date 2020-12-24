import { useState, useEffect, useRef } from "react";
import img from "../assets/exclamation.svg";
import svg from "../assets/landingPhoto.svg";
import svg2 from "../assets/landingPhoto2.svg";
import help from "../assets/Help.svg";

import "./Styles/Error.css";
const Error = ({ a, b }) => {
	// useEffect()
	// const size = useWindowSize();
	const [width, setWidth] = useState(window.innerWidth);
	const logo = useRef(svg);
	const handleResize = () => setWidth(window.innerWidth);
	if (width < 801) {
		logo.current = svg2;
	} else logo.current = svg;
	const [helpp, updateHelp] = useState(false);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});
	return (
		<div className='landing'>
			<div className='left rat'>
				<div className='lab'>
					<div className='qwerty2'>
						<img src={img} className='eiiimg' />
						<div className='qwerty3'>
							<span className='rcc'>{a}</span>
							<br></br>
							<br></br>
							<br></br>
							<span className='ffd'>{b}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='right tarr'>
				<div className='rab'>
					<img src={logo.current} className='foto' />
				</div>
				{/* <img src={logo.current} className='foto' /> */}

				<span className='lccs'>Core Committee Selection 2020</span>
				<div className='helpStuff'>
					<span className='help'>Help?</span>
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

export default Error;
