//React
import React from 'react';
import { Link } from 'react-router-dom';
const Botontickets = () => {
    return ( 
        
                <Link to="/boton" className="fancy" id="boton">
                <span class="top-key"></span>
                <span class="text" >Buy Tickets</span>
                <span class="bottom-key-1"></span>
                </Link>
                
        
     );
}
 
export default Botontickets;