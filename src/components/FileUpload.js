import React, {Component, Fragment} from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    	var file = event.target.files[0];
	  	var reader = new FileReader();
		  reader.onload = function(event) {
		    // The file's text will be printed here
		    console.log(event.target.result)
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