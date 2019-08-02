import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
// import "antd/dist/antd.css";
import Invoices from './components/Invoices';
import {routes} from './routers/routes';

const App = () => {
    return(
        <div>
            <Header/>
            <Invoices/>
        </div>
    )
}

ReactDOM.render(routes, document.getElementById('root'));