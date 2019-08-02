import React from 'react';
import {Modal, Form, Input} from 'antd';
    
class ItemFormModal extends React.Component {
  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Input new item"
        okText="Ok"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input name!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Price">
            {getFieldDecorator('price', {
              rules: [
                {
                  required: true,
                  pattern: new RegExp("^[0-9]+(\.[0-9]{1,2})?$"),
                  message: 'Please input valid price value.',
                }
              ],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Quantity">
            {getFieldDecorator('quantity', {
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

export default Form.create()(ItemFormModal);