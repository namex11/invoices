import React, { Component } from 'react'
import axios from 'axios';
import { Table, Button, Divider, message, Typography} from 'antd';
import ItemFormModalActions from './forms/itemForm/ItemFormModalActions';
const {Title} = Typography;

export default class Items extends Component {
    state ={
        filteredInfo: null,
        sortedInfo: null,
        invoiceId: this.props.match.params.id,
        items: []
    }

    componentWillMount = () =>{
        console.log(this.state.invoiceId);
        axios.get(`http://localhost:8080/api/invoice/${this.state.invoiceId}`)
              .then((response)=>{
                this.setState(({
                  items: response.data.items
                }))
              })
        
    }

    handleItemDelete = (itemId) => {
        axios.delete(`http://localhost:8080/api/invoice/${this.state.invoiceId}/${itemId}`)
          .then(() =>{
            this.componentWillMount();
            message.info('Item was deleted succesfully.');
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
          dataIndex: 'name',
          key: 'name',
        //   filters: this.state.items.map(({name}) => ({
        //     text: name, value: name
        //   })),
          filteredValue: filteredInfo.name || null,
          onFilter: (value, record) => record.name.includes(value),
          sorter: (a, b) => this.nameSorter(a.name, b.name),
          sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          sorter: (a, b) => a.price - b.price,
          sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            sortOrder: sortedInfo.columnKey === 'quantity' && sortedInfo.order,
          }, {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type='danger' onClick={()=> this.handleItemDelete(record.id)}>Delete</Button>
            </span>
          ),
        }];
        return (
          <div>
            <Title>Items list</Title>
            <div className="table-operations">
              <ItemFormModalActions invoiceId={this.state.invoiceId} refreshData={this.componentWillMount}/>
              <Button onClick={this.clearFilters}>Clear filters</Button>
              <Button onClick={this.clearAll}>Clear filters and sorters</Button>
            </div>
            <Table 
              rowKey={record=>record.id} 
              columns={columns} 
              dataSource={this.state.items} 
              onChange={this.handleChange} 
              pagination={{pageSize: 8}}
            />
          </div>
        );
      }
}
