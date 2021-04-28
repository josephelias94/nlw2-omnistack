import React, { useState, useEffect } from 'react';
import LogoImg from '../../assests/images/logo.svg';
import HeroImg from '../../assests/images/landing.svg';
import StudyIcon from '../../assests/images/icons/study.svg';
import GiveClassesIcon from '../../assests/images/icons/give-classes.svg';
import HeartIcon from '../../assests/images/icons/purple-heart.svg';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div id="logo-container">
          <img src={LogoImg} alt="Proffy Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img src={HeroImg} alt="" id="hero-image" />
        <div id="buttons-container">
          <Link to="/study" id="study">
            <img src={StudyIcon} alt="Estudar" /> Estudar
          </Link>
          <Link to="/give-classes" id="give-classes">
            <img src={GiveClassesIcon} alt="Dar aulas" /> Dar aulas
          </Link>
        </div>
        <span id="total-connections">
          Total de {totalConnections} conexões já realizadas <img src={HeartIcon} alt="" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
