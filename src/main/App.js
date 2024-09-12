import React from 'react';
import Rotas from './rotas';
import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css';
import Navbar from '../components/navbar'
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';

 class App extends React.Component{

  render(){
    return(
      <>
        <Navbar/>
          <div className="container">
            <Rotas/>
          </div>
      </>
    )
  }
}

export default App;// EXPORTA PARA Q OUTROS ARQUIVOS  POSSAM VER
