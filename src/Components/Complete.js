import { useEffect, useState, useRef } from "react";
import svg from "../assets/landingPhoto.svg";
import svg2 from "../assets/landingPhoto2.svg";
import img from "../assets/tick.svg";
import "./Styles/Complete.css";
import help from "../assets/Help.svg";

const Landing = () => {
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
		<div className='landing' style={{ overflow: "none" }}>
			<div className='left'>
				<div className='lav lleft'>
					<div className='qwerty2'>
						<img src={img} className='eiiimg' />
						<div className='qwerty4'>
							<span className='rc'>Registration Complete!</span>
							<br></br>
							<br></br>
							<br></br>
							<span className='ffd'>
								For further details, please check your VIT
								e-mail ID
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='right tar'>
				<div className='rab barr'>
					<img src={logo.current} className='foto ds' />
				</div>
				{/* <img src={logo.current} className='foto' /> */}

				<span className='lccs'>Core Committee Selection 2020</span>
				<div className='helpStuff eewq'>
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

export default Landing;
