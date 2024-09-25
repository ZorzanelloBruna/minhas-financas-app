import React from 'react';
import Rotas from './rotas';
import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css';
import Navbar from '../components/navbar'
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';

import 'primereact/resources/themes/nova-alt/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ProvedorAutenticacao from './provedor-autenticacao';

 class App extends React.Component{

  render(){
    return(
      <ProvedorAutenticacao>
        <Navbar/>
          <div className="container">
            <Rotas/>
          </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;// EXPORTA PARA Q OUTROS ARQUIVOS  POSSAM VER
