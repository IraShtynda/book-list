import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <Link
      to='https://github.com/IraShtynda'
      target='blanc'
      className='footer'
    >
      © Created by Iryna Shtynda
    </Link>
  );
};
