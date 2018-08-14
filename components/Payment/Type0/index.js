/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadPay,payPoint} from '../../../config/requires'
// import assign from 'core-js/library/fn/object/assign'

require('./index.css')

class Type0 extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign(this.props.location.state, {url: this.props.location.state.url?this.props.location.state.url:""});
    }

    componentWillMount(){
        var data = this.state;
        if(!data.url){
            this._isMounted = true;
            loadPay(data).then((res) => {
                if(res.code==200){
                    if (this._isMounted) {
                        this.setState({
                            url: res.data.returnInfo.url
                        })
                    }
                    payPoint();
                }else{
                    console.log("load order fail");
                }
            });
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        return (
            <div className="payment-nav">
                <iframe className="web" src={this.state.url}></iframe>
            </div>
        )
    }
}

Type0.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default Type0;
