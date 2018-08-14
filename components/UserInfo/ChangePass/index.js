/**
 * Created by karl.zheng on 2018/4/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {changePass, reqLogin, salert} from '../../../config/requires'
import {insertAccount} from '../../../actions'
import md5 from '../../../config/md5'
import {api} from '../../../config/index'
require('./index.css')

class ChangePass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            oldpass: "",
            pass1: "",
            pass2: ""
        };
        this.onChange = this.onChange.bind(this);
        this.changePass = this.changePass.bind(this);
    }

    onChange(e){
        switch (e.target.id){
            case "oldpass":
                var pass = e.target.value;
                this.setState({
                    oldpass: pass
                });
                break;
            case "pass1":
                var pass = e.target.value;
                this.setState({
                    pass1: pass
                });
                break;
            case "pass2":
                var pass = e.target.value;
                this.setState({
                    pass2: pass
                });
                break;
            default:
                break;
        }
    }

    changePass(){
        var _this = this;
        if(this.state.pass1!=this.state.pass2){
            salert("Mật khẩu trước và sau không khớp")
        }else if(this.state.pass1==""||this.state.oldpass==""){
            salert("Nhập mật khẩu");
        }else{
            var oldpass = md5(this.state.oldpass);
            var password = md5(this.state.pass1);
            changePass(oldpass, password).then((res) => {
                if(res.code==200){
                    salert("success");
                    // reqLogin(_this.props.account.userName, password);
                    var data = {
                        accountType: 1,
                        userId: _this.props.account.userId,
                        userName: _this.props.account.userName,
                        token: _this.props.account.token,
                        password: password,
                        activeTime: new Date().getTime()
                    };
                    _this.props.insertAcc(data);
                    _this.context.router.push('/');
                    window.location.href = api.login_uri+"#/login/account";
                }else if(res.code==107){
                    salert("Người dùng không tồn tại hoặc mật khẩu sa")
                }
                // 107 changepwd password not equal
            });
        }
    }

    render(){
        return (
            <div className="change-pass">
                <div className="item-pass">
                    <div className="ui_setting"></div>
                    <input id="oldpass" type="password" placeholder="Please enter your current password" onChange={(e) =>this.onChange(e)}/>
                </div>
                <div className="item-pass">
                    <div className="ui_password"></div>
                    <input id="pass1" type="password" placeholder="Please enter your new password(6-20)" onChange={(e) =>this.onChange(e)}/>
                </div>
                <div className="item-pass">
                    <div className="ui_password"></div>
                    <input id="pass2" type="password" placeholder="Please enter your new password" onChange={(e) =>this.onChange(e)}/>
                </div>

                <button className="btn-change" onClick={this.changePass}>Change password</button>
            </div>
        );
    }
}

ChangePass.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    account: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    insertAcc: (account) => {
        dispatch(insertAccount(account))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePass)