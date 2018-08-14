/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadPay,payPoint} from '../../../config/requires'
// import assign from 'core-js/library/fn/object/assign'

require('./index.css')

class Type2 extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign(this.props.location.state, {PIN: ""});
        this.change = this.change.bind(this);
        this.pay = this.pay.bind(this);
    }

    pay(){
        var payment = this.state;
        loadPay(payment).then((res) => {
            if(res.code==200){
                payPoint();
            }else{
                console.log("load order fail");
            }
        });
    }

    change(e){
        this.setState({
            PIN: e.target.value
        })
    }

    render(){
        return (
            <div className="payment-nav">
                <h2 className="name">
                    {this.state.name}
                    <span className="exchange">Exchange rate</span>
                </h2>

                <img className="card-head" src={this.state.codeImg}/>

                <div className="card-inputs PIN" >
                    <span>PIN: </span>
                    <input placeholder="Please enter PIN" value={this.state.PIN} id="pin" onChange={this.change}/>
                </div>

                <a href="javascript:void(0);" className="btn-pay" onClick={this.pay}>Payment</a>
            </div>
        )
    }
}

Type2.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Type2;
