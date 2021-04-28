import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../assests/images/logo.svg';
import BackIcon from '../../assests/images/icons/back.svg';
import './styles.css';

interface PurpleHeaderProps {
  title: string;
  description?: string;
}

const PurpleHeader: React.FC<PurpleHeaderProps> = (props) => {
  return (
    <header id="page-header">
      <div id="top-bar-container">
        <Link to="/">
          <img src={BackIcon} alt="" />
        </Link>
        <img src={LogoImg} alt="" />
      </div>
      <div id="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}
        {props.children}
      </div>
    </header>
  );
};

export default PurpleHeader;
