// import React, { Component } from 'react';
// import axiosInstance from '../axiosApi';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';



// export class signup extends Component {

//     constructor() {  
//         super();  
      
//         this.state = {  
//           Email: '', 
//           Name: '',
//           Mob_no: '', 
//           Password: '',
//           Re_password: '',
//         }  

//         this.Email = this.Email.bind(this);  
//         this.Password = this.Password.bind(this);  
//         this.Name = this.Name.bind(this);  
//         this.Re_password = this.Re_password.bind(this);  
//         this.Mob_no = this.Mob_no.bind(this);  
//         this.register = this.register.bind(this);
//     }

//     Email(event) {  
//         this.setState({ Email: event.target.value })  
//     }  
      
//     Mob_no(event) {  
//         this.setState({ Mob_no: event.target.value })  
//     }  
      
//     Password(event) {  
//         this.setState({ Password: event.target.value })  
//     } 
    
//     Re_password(event) {  
//         this.setState({ Re_password: event.target.value })  
//     } 
    
//     Name(event) {  
//         this.setState({ Name: event.target.value })  
//     }  

    

//     async register(event) {   

//         event.preventDefault();

//         axios.post('http://localhost:8000/auth/users/',{
//             name: this.state.Name,  
//             password: this.state.Password,  
//             email: this.state.Email,  
//             mob_number: this.state.Mob_no,  
//             re_password: this.state.Re_password
//         })
//         .then(function (res){
//             console.log(res.data)
//             // localStorage.setItem('token', res.data.access);
//             localStorage.setItem('user', res.config.data);
//             console.log(localStorage.getItem('user'));
//         }).catch(function (err){
//             console.log(err)
//         })
        
//     }  
    
//     render() {
//         return (
//             <div className="row">
//                 <div className="col col-md-4 mx-auto px-4 border border-secondary rounded">
//                     <form className="">
//                         <h2 className="my-4 text-success"><u>Register</u></h2>

//                         <div className="form-group mb-3">
//                             <input type="email" className="form-control" onChange={this.Email} placeholder="Enter email" />
//                         </div>

//                         <div className="form-group mb-3">
//                             <input type="text" className="form-control" onChange={this.Name} placeholder="Enter name" />
//                         </div>

//                         <div className="form-group mb-3">
//                             <input type="text" className="form-control" onChange={this.Mob_no} placeholder="Mob. number" />
//                         </div>

//                         <div className="form-group mb-3">
//                             <input type="password" className="form-control" onChange={this.Password} placeholder="Enter password" />
//                         </div>

//                         <div className="form-group mb-3">
//                             <input type="password" className="form-control" onChange={this.Re_password} placeholder="Re-enter password" />
//                         </div>

//                         <button type="submit" onClick={this.register} className="btn btn-outline-success btn-lg btn-block my-2">Register</button>
//                         <p className="forgot-password text-right">
//                             Already registered? <a href="#">log in</a>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }

// export default signup

import React from 'react'
import { useHistory } from 'react-router'

function Signup() {

    const history = useHistory()
    // const [error, seterror] = useState('')

    let registerUser = async (e )=> {
        e.preventDefault()
        var error_msg = document.getElementById('error_msg');
        let response = await fetch('http://localhost:8000/auth/users/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'name':e.target.name.value, 'mob_number':e.target.mob_no.value, 'password':e.target.password.value, 're_password':e.target.re_password.value})
        })
        console.log(response);
        let data = await response.json()
        console.log(data.email);

        if(response.status === 201){
            // setAuthTokens(data)
            // setUser(jwt_decode(data.access))
            
            history.push('login/')
        }else{
            error_msg.textContent = data.email;
        }
    }

    let validateForm =(e) => {
        var error_msg = document.getElementById('error_msg');
        var email_input = e.target.email.value;
        var mobile_input = e.target.mob_no.value
        var password_input = e.target.password.value;
        var rePassword_input = e.target.re_password.value;
        if (email_input === "" || password_input === "" || rePassword_input === "" || mobile_input === ""){
          error_msg.textContent = "Input fields must not be empty";
          e.preventDefault()
        }
        else
        {
          if(isNaN(mobile_input)){
            error_msg.textContent = "Mobile number must be in digits";
            e.preventDefault()
          }
  
          else if(mobile_input.length !== 10){
            error_msg.textContent = "Mobile number must be of 10 digits";
            e.preventDefault()
          }
  
          else if(password_input.length < 8){
            error_msg.textContent = "Password must be of atleast 8 characters";
            e.preventDefault()
          }
  
          else if (password_input !== rePassword_input){
            error_msg.textContent = "Both password field should match";
            e.preventDefault()
          }
  
          else {
            error_msg.textContent = "everything is fine!!";
            e.preventDefault()
            registerUser(e);
          }
        }
      }


    return (
            <div className="row">
                <div className="col col-md-4 mx-auto px-4 border border-secondary rounded">
                    <form className="" onSubmit={validateForm}>
                        <h2 className="my-4 text-success"><u>Register</u></h2>

                        <div  class="form-group clearfix mb-3 mt-3">
                          <h3 id = "error_msg" class ="text-danger font-weight-bold"></h3>
                        </div>

                        <div className="form-group mb-3">
                            <input type="email" className="form-control" name="email" placeholder="Enter email" />
                        </div>

                        <div className="form-group mb-3">
                            <input type="text" className="form-control" name="name" placeholder="Enter name" />
                        </div>

                        <div className="form-group mb-3">
                            <input type="text" className="form-control" name="mob_no" placeholder="Mob. number" />
                        </div>

                        <div className="form-group mb-3">
                            <input type="password" className="form-control" name="password" placeholder="Enter password" />
                        </div>

                        <div className="form-group mb-3">
                            <input type="password" className="form-control" name="re_password" placeholder="Re-enter password" />
                        </div>

                        <button type="submit" className="btn btn-outline-success btn-lg btn-block my-2">Register</button>
                        <p className="forgot-password text-right">
                            Already registered? <a href="#">log in</a>
                        </p>
                    </form>
                </div>
            </div>
    )
}

export default Signup

