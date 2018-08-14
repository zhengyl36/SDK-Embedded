/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadPay,payPoint,getSource} from '../../../config/requires'
require('./index.css')

class Type5 extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.location.state;
        this.change = this.change.bind(this);
        this.pay = this.pay.bind(this);
    }

    change(value){
        for(var i = 0; i < this.state.products.length; i++){
            if(this.state.products[i].amount == value){
                this.setState({
                    selectedProduct:  this.state.products[i]
                })
            }
        }
    }

    pay(){
        var payment = this.state;
        var _this = this;
        loadPay(payment).then((res) => {
            if(res.code==200){
                payPoint();
                if(res.data.returnInfo.url){
                    var url = res.data.returnInfo.url;
                    var source = getSource();
                    if(_this.state.name=="SMS" && source ==3){
                        var temp = url.split("?")[1];
                        url = "http://vn.webpay.bluepay.tech/bluepay/qr.php?"+temp;
                        setTimeout(function(){
                            _this.context.router.push('/');
                        }, 6000)
                    }
                    var path = {
                        pathname: '/payment/type0',
                        state: {
                            url: url
                        }
                    }
                    this.context.router.push(path);
                }
            }else{
                console.log("load order fail");
            }
        });
    }

    render(){
        let select;
        return (
            <div className="payment-nav">
                <h2 className="name">{this.state.name}</h2>
                <div className="product">
                    <p className="tip">Sản phẩm</p>
                    <select className="productions" value={this.state.selectedProduct.amount} ref={node => {select = node}} onChange={() => {this.change(select.value)}}>
                        {
                            this.state.products.map((key, index) => (
                                    <option key={index} value={key.amount}>{key.gameCoin + key.gameCurrency}</option>
                                ))
                            }
                        }
                    </select>
                    {/*<a href="javascript:void(0);" className="icon-down">*/}
                    {/*</a>*/}
                </div>
                <div className="result">
                    <span>Cần trả: </span>
                    <p>{this.state.selectedProduct.shortCurrency+' '+this.state.selectedProduct.amount}</p>
                </div>
                <a href="javascript:void(0);" className="buy-goods" onClick={this.pay}>Mua KNB</a>
            </div>
        )
    }
}

Type5.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Type5;
