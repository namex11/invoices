import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Table, Button, Divider, message, Typography} from 'antd';
import FormModalActions from './forms/invoiceForm/FormModalActions';
const {Title} = Typography;

class Invoices extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    invoices: []
  };

  componentWillMount = () => {
    axios.get("http://localhost:8080/api/invoice")
          .then(promise =>{
            this.setState({
              invoices: promise.data
            })
            console.log(this.state.invoices)
          })
          .catch(() =>{
            message.error("Couldnt connect to database to get your invoices", 0);
          })
  }

  handleInvoiceDelete = (id) =>{
    axios.delete(`http://localhost:8080/api/invoice/${id}`)
          .then(() =>{
            this.componentWillMount();
            message.info('Invoice was deleted succesfully.');
          })
          .catch(()=>{
            message.error("Whoopsie, something went wrong, couldnt delete selected invoice :(", 10);
          })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  nameSorter(a, b){
    const aCase = a.toLowerCase();
    const bCase = b.toLowerCase();
    if(aCase < bCase) { return -1; }
    if(aCase > bCase) { return 1; }
    return 0;
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Name',
      dataIndex: 'receiver',
      key: 'receiver',
      filters: this.state.invoices.map(({receiver}) => ({
        text: receiver, value: receiver
      })),
      filteredValue: filteredInfo.receiver || null,
      onFilter: (value, record) => record.receiver.includes(value),
      sorter: (a, b) => this.nameSorter(a.receiver, b.receiver),
      sortOrder: sortedInfo.columnKey === 'receiver' && sortedInfo.order,
    }, {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.number - b.number,
      sortOrder: sortedInfo.columnKey === 'number' && sortedInfo.order,
    }, {
      title: 'Vendor',
      dataIndex: 'prescribedCompany',
      key: 'prescribedCompany',
      filters: 
        this.state.invoices.map(({prescribedCompany})=>({
          text: prescribedCompany, value: prescribedCompany
        }))
      ,
      filteredValue: filteredInfo.prescribedCompany || null,
      onFilter: (value, record) => record.prescribedCompany.includes(value),
      sorter: (a, b) => this.nameSorter(a.prescribedCompany, b.prescribedCompany),
      sortOrder: sortedInfo.columnKey === 'prescribedCompany' && sortedInfo.order,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Date',
      dataIndex: 'creationDate',
      key: 'date',
      // sorter: (a, b) => a.number - b.number,
      // sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={{
            pathname: '/' + record.id,
          }}>Edit invoice</Link>
          <Divider type='vertical' />
          <Link to={{
            pathname:'/item/' + record.id
            }}>Show items</Link>
          <Divider type="vertical" />
          <Button type='danger' onClick={()=> this.handleInvoiceDelete(record.id)}>Delete</Button>
        </span>
      ),
    }];
    return (
      <div>
        <Title>Invoices list</Title>
        <div className="table-operations">
          <FormModalActions refreshData = {this.componentWillMount} />
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table 
          rowKey={record=>record.id} 
          columns={columns} 
          dataSource={this.state.invoices} 
          onChange={this.handleChange} 
          pagination={{pageSize: 8}}
        />
      </div>
    );
  }
}

export default Invoices;