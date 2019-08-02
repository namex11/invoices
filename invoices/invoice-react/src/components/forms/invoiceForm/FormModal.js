import React from 'react';
import {Modal, Form, Input} from 'antd';
    
class FormModal extends React.Component {
  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new invoice"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Receiver">
            {getFieldDecorator('receiver', {
              rules: [{ required: true, message: 'Please input the receiver!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Vendor">
            {getFieldDecorator('prescribedCompany', {
              rules: [{ required: true, message: 'Please input the vendor!' }]
            })(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="Invoice number">
            {getFieldDecorator('number', {
              rules: [
                {
                  required: true,
                  type: 'integer',
                  message: 'Please input valid number value.',
                  transform(value) {
                    return Number(value)}
                }
              ],
            })(
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(FormModal);
  
  