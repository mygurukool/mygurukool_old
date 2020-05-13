import React, {Component, Fragment} from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class FileUpload extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      file:''
	    };

	    this.handleFileChange = this.handleFileChange.bind(this);
	  
	}
	handleFileChange = (event) => {
    	// this.setState({file:event.target.value});
    	// alert(event.target.files[0]);
    	// const reader = new FileReader();
    	// console.log(reader.readAsText(event.target.files[0]));
    	const config = {
		    headers: { 
		    			Authorization: `Bearer ${localStorage.getItem('userDetails')}`,
		    			'Content-Type': 'text/plain'
		    		}
		};

		const bodyParameters = {
		   "filecContent":event.target.result
		};
    	var file = event.target.files[0];
	  	var reader = new FileReader();
		  reader.onload = function(event) {
		    // The file's text will be printed here
		    console.log(event.target.result);
		    axios.put(`https://graph.microsoft.com/v1.0/sites/mygurukool.sharepoint.com,7c9fc398-a705-4e32-8b92-1c55f6536ca5,960408e8-1290-401d-bb0e-e80861e1e003/drives/b!mMOffAWnMk6LkhxV9lNspegIBJaQEh1Auw7oCGHh4AN3wsxO31WBSJXjoo9fcf91/items/01RYMJ7Z4Y4ILBEY3CBVF3WAF26DLAFX7M:/${localStorage.getItem('studentName')}:/content`,
    		{ 
    			bodyParameters,
    			config
			}
    	).then( response => {
    	})
		  };

		  reader.readAsText(file);
		  
    }
	render() {
		return(
			<Fragment>
			<input type="file" class="custom-file-input" id="customFile" onChange={this.handleFileChange}/>
		  	<label className="custom-file-label" >Choose file</label>
		  	{
		  		this.state.file ? this.state.file : ''
		  	}
		  	</Fragment>
		)
	}
}