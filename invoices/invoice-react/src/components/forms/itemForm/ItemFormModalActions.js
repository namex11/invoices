import React from 'react';
import axios from 'axios';
import ItemFormModal from './ItemFormModal';
import {Button} from 'antd';

export default class ItemFormModalActions extends React.Component {
    state = {
      visible: false,
    };
  
    showModal = () => {
      this.setState({ visible: true });
    }
  
    handleCancel = () => {
      this.setState({ visible: false });
    }
  
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        axios.post(`http://localhost:8080/api/invoice/${this.props.invoiceId}`, values)
            .then(()=>{
                form.resetFields();
                this.props.refreshData();
                this.setState({ visible: false });
            })
        
      });
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>New Item</Button>
          <ItemFormModal
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }