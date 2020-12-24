import img2e from './img/img2e.png';
import img4m from './img/img4m.jpeg';
import img9e from './img/img9e.png';
import img22e from './img/img22e.jpg';
import img25e from './img/img25e.png';
import img27l from './img/img27l.png';
import img30e from './img/img30e.png';

export default (img) => {
	console.log(img);
	if (img == 'img2e.png') return <img src={img2e} className='qimg' />;
	if (img == 'img4m.jpeg') return <img src={img4m} className='qimg' />;
	if (img == 'img9e.png') return <img src={img9e} className='qimg' />;
	if (img == 'img22e.jpg') return <img src={img22e} className='qimg' />;
	if (img == 'img25e.png') return <img src={img25e} className='qimg' />;
	if (img == 'img27l.png') return <img src={img27l} className='qimg' />;
	if (img == 'img30e.png') return <img src={img30e} className='qimg' />;
};
