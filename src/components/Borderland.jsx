//React
import React from 'react';

//Styles
import '../bootstrap/bootstrap-icons/bootstrap-icons.css';
import '../bootstrap/bootstrap.min.css';
import '../styles/App.css';


//Componentes
import Navbar from './Navbar';
import Section from './/Section';
import Logo from './Logo'
import Botontickets from './Botontickets';
import Welcome from './welcome';
import Cards from './Cards';
import PanelGroup from './Panel/PanelGroup';



function Borderland() {

  return (
    <body>
      <div className='root'>
        
            <header id="header" className="header d-flex align-items-center">
              <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                <Logo />
                <Navbar />
              </div>
            </header>

            <section id="hero" class="hero">
              <Section />
              <div className="info d-flex align-items-center">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                      <Welcome />
                      <Botontickets />
                    </div>
                  </div>
                </div>
              </div>

            </section>
            <main id='main'>
              <PanelGroup />
              <Cards />
            </main>
          
      </div>


    </body>


  );
}

export default Borderland;
