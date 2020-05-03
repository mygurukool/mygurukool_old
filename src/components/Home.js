import React, {Component, Fragment} from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import axios from 'axios';
import hello from 'hellojs/dist/hello.all.js';

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count+1)
  );
  return count;
}
const code = 'OAQABAAIAAAAm-06blBE1TpVMil8KPQ41byBivAWW02PgV06LoSk6YG4fr89OH2Q-SIc12Rul-tdewdbS2ZsC9tftTnvdX7vvDjYNOhO1MpRjiIPji5kJT1nSWtKcIR-nF7vzv9CXyZ5Pi6XFY-3IaT8BjMDzBkVp5xunFPK_qBE1Y6SzGiv-qUa5gkA2dmp7i-0VkfO9zuPb_61YfRWx-6LNFlQVjpxDJiOhI28pRV1_irdSebqFh21mtHmCoLpnA5O2r44-vg3a_81x_gVOS6PoNpIXlOAjAk6hhPpsH5a7m4J7th-nAzsZEgRLqF-2bpL44RKGYb-kFEw9C6_hmJW5XpLdWZqr7P9HCWHZHLYL06ufCGRfZqrULVXitNheDYjhDvl9R4377dLYb9voGbFp625uoezNzG7gvLcpfAOe2zrt_-C2aJ3Oda7_UOYkUjVw90Te1oUPw-yJ6Q9jfG8mENlWyithCU-ON6ck3A5AUOOfUhagJv37-YO4v1klhAOqzBa8gfG2bzLIfJXKYkbcSBwqq_RIQaHNYkTbbJpKuS0y4e30W68hn2sNKqw9uXKUfPUGj3_mfwFcBap9dmE9-EBY7wsSuTMVmJvvO-_ay5qXH02nBP0tgrjwdEBJp8JNHu-O2YZoQ4OAvAT2kEgbQAUe6ztqhG0y9ODlrhp3k0K_SD1KEHyt3ttG8pA-y-TWhDLh9vsgAA';
export default class Home extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      errorCount: null,
	      errors: {
	        email: '',
	        password: '',
	      }
	    };
	}

	handleChange = (event) => {
	    event.preventDefault();
	    const { name, value } = event.target;
	    let errors = this.state.errors;

	    switch (name) {
	      case 'email': 
	        errors.email = 
	          value != 'admin'
	            ? 'Username is not valid'
	            : '';
	        break;
	      case 'password': 
	        errors.password = 
	          value != 'admin'
	            ? 'Password is not valid!'
	            : '';
	        break;
	      
	      default:
	        break;
	    }

	    this.setState({errors, [name]: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
    	this.setState({errorCount: countErrors(this.state.errors)});
    	const bodyParameters = {
		   'grant_type': 'authorization_code',
		   'client_id' : '1f4ddefc-d849-4f30-a410-73297ed98422',
		   'scope' : 'Notes.Read.All',
		   'code' : code,
		   'redirect_uri': 'https://login.microsoftonline.com/common/oauth2/nativeclient'
		};
		const params = 'client_id=1f4ddefc-d849-4f30-a410-73297ed98422&scope=Notes.Read.All&grant_type=authorization_code&redirect_uri=https://login.microsoftonline.com/common/oauth2/nativeclient&code='+code
    	axios.post("https://login.microsoftonline.com/mygurukool.onmicrosoft.com/oauth2/v2.0/token",
  //   	{
		//    'grant_type': 'authorization_code',
		//    'client_id' : '1f4ddefc-d849-4f30-a410-73297ed98422',
		//    'scope' : 'Notes.Read.All',
		//    'code' : code,
		//    'redirect_uri': 'https://login.microsoftonline.com/common/oauth2/nativeclient'
		// },
    	// {
	        {
	        	headers: {
	            	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

	        },
	        body: params,
		},
		
		)
    	.then( response => {
    		console.log(response);
    	})

	}

	render() {
		const {errors, formValid} = this.state;
		return (
			<Fragment>
				<Header />
				<div className="container">
					<div className="row section-nav">
						<div className="col-12">
							<div className="alert alert-success">
								Please use admin/admin to login.
							</div>
							<form  className="form-signin" method="POST"
		                      onSubmit={this.handleSubmit} noValidate>
		                      	<div className="form-group">
									<label  className="sr-only">Email address</label>
								  		<input type="text" id="email" name="email" className="form-control" placeholder="Username" required onChange={this.handleChange} noValidate/>
								  		{errors.email.length > 0 && 
  										<span className='error'>{errors.email}</span>}
  								</div>
  								<div className="form-group">
								  	<label  className="sr-only">Password</label>
								  	<input type="password" name="password" id="password" className="form-control" placeholder="Password" required onChange={this.handleChange} noValidate/>
								  	{errors.password.length > 0 && 
  									<span className='error'>{errors.password}</span>}
  								</div>
  								<div className="form-group">
								  	<button className="btn btn-lg btn-submit btn-block" type="submit">Sign In</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}