//css
import './bootstrap/bootstrap-icons/bootstrap-icons.css';
import './bootstrap/bootstrap.min.css';

//REACT
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Componentes
import Borderland from './components/Borderland';
import Login from './components/Login/Login';
import Formulario from './components/Formulario/Formulario';
import Pago from './components/Pago/Pago';
import Social from './components/Social/Social';
import Correo from './components/Correo';
import Editar from './components/Editar';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Borderland" component={Borderland} />
        <Route path="/Formulario" component={Formulario} />
        <Route path="/Pago" component={Pago} />
        <Route path="/Social" component={Social} />
        <Route path="/Correo" component={Correo} />
        <Route path="/Editar" component={Editar} />




      </Switch>
    </Router>

  );
}

export default App;
