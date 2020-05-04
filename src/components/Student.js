import React, {Component, Fragment} from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/HashLoader";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
 
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default class Student extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      studentData: null,
	      displayName : '',
	      sections: '',
	      tabIndex: 0,
	      exercise : '',
	      exercisedata:'',
	      isLoading: false,
	    };
	  
	}
	componentDidMount() {
	 	this.state.isLoading = true;

	 	localStorage.setItem('token','eyJ0eXAiOiJKV1QiLCJub25jZSI6Ikd1ZTZrVFpWeFVDaVVzRjZMeW5Xel9FYVo5TEI0dFNwaXVKRlRYMkx1bjQiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSIsImtpZCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNzVjZjE0YS0xOGRhLTQwNGYtOTcwMy04NjNlOGQ4Y2FlNDcvIiwiaWF0IjoxNTg4NTg0NjcyLCJuYmYiOjE1ODg1ODQ2NzIsImV4cCI6MTU4ODU4ODU3MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhQQUFBQTFPOU9lK0hhb3RpMmxGWnR3dnc4Tk9NOEhqTmZnRy9BdVNOQXFNOGQ3cWRtcFJzSG1XQk1GMlVUdHpOUEtaM3BGRVJuNU56cTVIdnVSdVAyRXZxV2JRPT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6Im15T25lbm90ZUFjY2Vzc0FwcCIsImFwcGlkIjoiMWY0ZGRlZmMtZDg0OS00ZjMwLWE0MTAtNzMyOTdlZDk4NDIyIiwiYXBwaWRhY3IiOiIwIiwiaXBhZGRyIjoiMjcuNTkuMjQzLjIxOSIsIm5hbWUiOiJNeUd1cnVLb29sIERldmVsb3BlciIsIm9pZCI6IjU1MGU0MjJiLThmZmUtNGMzMS1hMGY1LTY4YzRjODQzMmYyNCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMEI5RjFEQ0UyIiwic2NwIjoiTm90ZXMuUmVhZC5BbGwgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJYaHBWa0pfQjZ0QkhfWkZmMGZya3lmQVNVMzBzRXJCRFRMRU0tMU8wREcwIiwidGlkIjoiMTc1Y2YxNGEtMThkYS00MDRmLTk3MDMtODYzZThkOGNhZTQ3IiwidW5pcXVlX25hbWUiOiJkZXZAbXlndXJ1a29vbC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJkZXZAbXlndXJ1a29vbC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJabUtRZmsyTFhFNmNmSUxIdUFBZEFRIiwidmVyIjoiMS4wIiwieG1zX3N0Ijp7InN1YiI6InpoaEtya2NFVWJQdHVnVWlOSTFoSFprSW9UMFJWbV8wT3BueS1xUDNxV3MifSwieG1zX3RjZHQiOjE1ODc4Mjg0ODJ9.qhKN7OBxrwc6eL--OnzBo-_oyDXwOPAaaZMN2hc5tCglHHv9Nxduhc2Dc_isMpFHode8D30SeYVmOtPSXUA--BWqq51ze2Ee4BPC3XEPbRavT_1kQybgA7FJqTHbmc_gwUL2r9G9iYhG2E1qRAtJP_orTxKvUJiqXm__PiEQx2OapHBzSC9eFAuCvbsKn75_WLqwxddGWZ0vnq6YotcRJb4cFdM5UZ96IkQbozZEehlEGajrPQv-WnjtiDJCD7_XpqI5fPPyBCaOOwNjh5cCZvWHhFVnFjB5PaOyOzQbL_wYJIFUUA0VVNCfJipD780uVUcnDWWME_dfr_9jq1bVfQ');
	 	// axios.defaults.headers.common['Authorization'] = "Bearer " +localStorage.getItem('userDetails');
	 	const config = {
		    headers: { Authorization: `Bearer ${localStorage.getItem('userDetails')}` }
		};

		const bodyParameters = {
		   
		};
		
	    axios.get("https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/1-9e7210a1-77c7-4b10-8a1b-ab0fb4a9f4dd/sectionGroups",
    		{ params:{}, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    	).then( response => {

    		this.setState({ studentData: response.data });
    		this.setState({ displayName: this.state.studentData.value[0].displayName });
    		axios.get(`https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/${this.state.studentData.value[0].id}/sections`,
    			{ params:{}, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
	    	).then( response => {
	    		this.state.isLoading = false;
	    		this.setState({ sections: response.data });
	    		{ 
					axios.get(`https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${this.state.sections.value[0].id}/pages`,
						{ params:{}, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
			    	).then( response => {
			    		this.setState({ exercise: response.data });
			    		console.log(this.state.exercise);
			    		this.setState({ exercisedata: this.state.exercise });
			    	})  
				}	
	    		
	    	})
    	});
    }
    handleClick = (event) => {
    	this.state.isLoading = true;
    	// alert(event.target.id);
    	axios.get(`https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${event.target.id}/pages`,

			{ params:{}, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    	).then( response => {
    		this.state.isLoading = false;
    		this.setState({ exercise: response.data });
    		{
				this.state.exercise && this.state.exercise.value.map((exe, i) =>
					// console.log(exe.contentUrl)
					axios.get(exe.contentUrl,
						{ params:{}, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
			    	).then( response => {
							this.state.exercise.value[i].content = response.data;
							this.setState({ exercisedata: this.state.exercise });
			    	})
				)
			}
    	})
    	return false;
	}
	render() {
		return	(
			<Fragment>
				<Header />
				<div className="container">
					<div className="row section-nav">
						<div className="col-12">
							<div className="alert alert-primary" role="alert">
							
							  <span className="badge badge-light">{ this.state.displayName }</span>
							  <ul className="navbar-nav float-right">
								<li className="nav-item"><i className="far fa-comments"></i></li>
							  </ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="row sub-excer-section">
							<div className="col-12">
								
								

								    <ul className="nav nav-pills mb-3 sub-nav" id="pills-tab" role="tablist">
								    	{
											this.state.sections && this.state.sections.value.map((key, i) =>
											  <li  className="nav-item">
											  		<a className="nav-link active" id={key.id} data-toggle="pill" href="#?" onClick={this.handleClick}>
											  			{key.displayName}
											  		</a>
											  	</li>
											)
										}
								    </ul>
							 		
							</div>
							
						</div>
					</div>
					<div className='tabcontent col-12'>
						<ClipLoader
				          css={override}
				          size={30}
				          color={"#D77F36"}
				          loading={this.state.isLoading}
				        />
				        <Accordion>
				 			{ 
				 				this.state.exercisedata && this.state.exercisedata.value.map((exe,i) =>
				 					<AccordionItem>
				 						<AccordionItemHeading>
						                    <AccordionItemButton>
						                        {
						                        	exe.title ? exe.title : 'No Exercise Data'
						                        }  
						                    </AccordionItemButton>
						                </AccordionItemHeading>
						                <AccordionItemPanel dangerouslySetInnerHTML={{ __html: exe.content }}>
						                    
						                </AccordionItemPanel>
				 					</AccordionItem>
				 				)

				 			}
				 		</Accordion>
		 			
		 		</div>
				</div>

			</Fragment>
		)
	}
}