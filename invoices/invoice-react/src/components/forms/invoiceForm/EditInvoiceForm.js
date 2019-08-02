import React, { Component } from 'react';
import axios from 'axios';
import { Button, Alert, message, DatePicker } from 'antd';
import moment from 'moment'



export default class EditInvoiceForm extends Component {
    state = {
        name: '',
        vendor: '',
        number: '',
        date: '',
        error: ''
    }


    componentWillMount(){
        axios.get(`http://localhost:8080/api/invoice/${this.props.match.params.id}`)
            .then((response)=>{
                const data = response.data;
                this.setState({
                    name: data.receiver,
                    vendor: data.prescribedCompany,
                    number: data.number,
                    date: data.creationDate
                })
                console.log(this.state.date)
            })
    }

    onClose = () => {
        this.setState({
            error: ''
        })
    }

    onNameChange = (e) =>{
        const name = e.target.value;
        this.setState({
            name
        })
    }

    onVendorChange = (e) =>{
        const vendor = e.target.value;
        this.setState({
            vendor
        })
    }

    onNumberChange = (e) =>{
        const number = e.target.value;
        if (!number ||  number.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(()=>({number}))
        }
    }

    onDateChange = (date, dateString) => {
        console.log(date, dateString);
        this.setState({
            date: date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.vendor || !this.state.number || !this.state.name) {
            this.setState(()=>({error: 'Please provide all the invoice details before submiting.'}))
        } else{
            this.setState(()=>({error: ''}))
            axios.put("http://localhost:8080/api/invoice", {
                id: this.props.match.params.id,
                number: +this.state.number,
                prescribedCompany: this.state.name,
                receiver: this.state.vendor,
                creationDate: this.state.date
            }).then(()=>{
                message.success("Invoice was updated succesfully.", 10);
            })
        }
    }

  render() {
    
    return (
      <div>
        {
            this.state.error &&
            <Alert
                message={this.state.error}
                type="warning"
                closable
                onClose={this.onClose}
            /> 
        }
        <form onSubmit={this.onSubmit}>
            <input 
                type="text"
                placeholder="Name"
                value={this.state.name}
                onChange={this.onNameChange}
            />
            <input type="text" 
                placeholder="Vendor"
                value={this.state.vendor}
                onChange={this.onVendorChange}
            />
            <input 
                type='text'
                placeholder="Number"
                value={this.state.number}
                onChange={this.onNumberChange}
            />
            <DatePicker onChange={this.onDateChange} defaultPickerValue={moment(this.state.date)}/>
            <Button type='primary' htmlType='submit'>Edit invoice</Button>
        </form>
      </div>
    )
  }
}
