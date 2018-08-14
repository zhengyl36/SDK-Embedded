/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadPay,payPoint} from '../../../config/requires'
// import assign from 'core-js/library/fn/object/assign'

require('./index.css')

class Type1 extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign(this.props.location.state, {PIN: "", serialNo: ""});
        this.change = this.change.bind(this);
        this.pay = this.pay.bind(this);
    }

    pay(){
        var payment = this.state;
        payment.exInfo = JSON.stringify({
            serialNo: this.state.serialNo,
            pin: this.state.pin
        })
        loadPay(payment).then((res) => {
            if(res.code==200){
                payPoint();
            }else{
                console.log("load order fail");
            }
        });
    }

    change(e){
        if(e.target.id=="serial"){
            this.setState({
                Serial: e.target.value
            })
        }else{
            this.setState({
                PIN: e.target.value
            })
        }
    }

    render(){
        return (
            <div className="payment-nav">
                <h2 className="name">
                    {this.state.name}
                    <span className="exchange">Exchange rate</span>
                </h2>

                <img className="card-head" src={this.state.codeImg}/>

                <div className="card-inputs Serial" value={this.state.Serial} id="serial" onChange={this.change}>
                    <span>Serial: </span>
                    <input placeholder="Please enter Serial Number"/>
                </div>
                <div className="card-inputs PIN" value={this.state.PIN} id="pin" onChange={this.change}>
                    <span>PIN: </span>
                    <input placeholder="Please enter PIN"/>
                </div>

                <a href="javascript:void(0);" className="btn-pay" onClick={this.pay}>Payment</a>
            </div>
        )
    }
}

Type1.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Type1;
