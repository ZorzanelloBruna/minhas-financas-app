import React from "react";
import { withRouter} from 'react-router-dom';
import Imagens from '../imagens/Dados-financas.jpg';

class PaginaInicial extends React.Component {
    
    gotToHomePage = () => {
        this.props.history.push('/home');
    }

    render(){
        return(
            <div className="container text-center">
                <h2>Bem vindo ao sistema Minhas Finanças</h2>
                <br/>

                <img src={Imagens} alt="Logo Minhas Finanças" style={{ width: '50%', marginBottom: '20px' }} />
                <div className="offset-md-4 col-md-4">
                    <button style={{width: '100%'}} className="btn btn-success" onClick={this.gotToHomePage}>
                        <i className="pi pi-sign-in"></i> Acessar
                    </button>
                </div>
            </div>
        )
    }
}

export  default withRouter(PaginaInicial);
