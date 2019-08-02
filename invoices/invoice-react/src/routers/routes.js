import { BrowserRouter, Route, Switch} from "react-router-dom";
import React from 'react';
import EditInvoiceForm from '../components/forms/invoiceForm/EditInvoiceForm';
import Invoices from "../components/Invoices";
import { NotFound } from '../components/Notfound';
import Header from "../components/Header";
import Items from "../components/Items";

const routes = (
    <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Invoices}/>
                <Route exact path="/:id" component={EditInvoiceForm} />
                <Route path="/item/:id" component={Items} />
                <Route component={NotFound} />
            </Switch>
    </BrowserRouter>
)

export { routes };