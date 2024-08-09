import React, { Component } from "react";

  
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }
  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };

  login = event => {
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;
    if (user_id === "admin" && user_password === "123") {
      localStorage.setItem("token", "T");
      this.setState({
        islogged: true
      });
    }
    event.preventDefault();
  };


  render() {
    if (localStorage.getItem("token")) {
      
    }
    return (
      <div className="Contains">
        <div className="contain">
          <form onSubmit={this.login} className="form-signin">
            <div className="login">
              <h2>Login</h2>
            </div>

            <div className="row">
            <div className="col">

              <input
                type="text"
                name="user_name"
                onChange={this.handleFormChange}
                placeholder= "Enter Username"
              />

              <p></p>

              <input
                type="password"
                name="user_password"
                onChange={this.handleFormChange}
                placeholder="Enter Password"
              />

              <p></p>

              <input type="checkbox" name="checks"/>
              <label for="check">Remember me</label> 

              <p></p>

              <div className="heads">
                <button className="forgett"><a href="a">Login</a></button>
                <button className="forgott"><a href="a">Forget password?</a></button>
              </div>
            </div>
            
        
          </div>
        </form>
      </div>
    </div>
    );
  }
}
 export default Login;