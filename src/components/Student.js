import React, {Component, Fragment} from 'react';
import '..//App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class Student extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      studentData: null,
	      displayName : '',
	      sections: '',
	      tabIndex: 0,
	      exercise : ''
	    };
	}
	componentDidMount() {
	 	this.state.isLoading = true;

	 	localStorage.setItem('token','eyJ0eXAiOiJKV1QiLCJub25jZSI6Im5keHdGanVJdHhnd193Z0N5aUJWMV9pX3QxcTRjb3YzVVBoTDdhbHNxNUUiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSIsImtpZCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNzVjZjE0YS0xOGRhLTQwNGYtOTcwMy04NjNlOGQ4Y2FlNDcvIiwiaWF0IjoxNTg4NTI3MjAxLCJuYmYiOjE1ODg1MjcyMDEsImV4cCI6MTU4ODUzMTEwMSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhQQUFBQSt6bGR6V20rMFhYYnhxa29Kdm16bWtGajI1aUQ4WUI4Z3RJWWYvZlBHZDlFc3lyd1QxbkJRcVF2aHJoNzk0REZOUWg3QlR4S0xYbG5tdGNIUXNYdHhRPT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6Im15T25lbm90ZUFjY2Vzc0FwcCIsImFwcGlkIjoiMWY0ZGRlZmMtZDg0OS00ZjMwLWE0MTAtNzMyOTdlZDk4NDIyIiwiYXBwaWRhY3IiOiIwIiwiaXBhZGRyIjoiMTgzLjgzLjY3LjE5NyIsIm5hbWUiOiJNeUd1cnVLb29sIERldmVsb3BlciIsIm9pZCI6IjU1MGU0MjJiLThmZmUtNGMzMS1hMGY1LTY4YzRjODQzMmYyNCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMEI5RjFEQ0UyIiwic2NwIjoiTm90ZXMuUmVhZC5BbGwgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJYaHBWa0pfQjZ0QkhfWkZmMGZya3lmQVNVMzBzRXJCRFRMRU0tMU8wREcwIiwidGlkIjoiMTc1Y2YxNGEtMThkYS00MDRmLTk3MDMtODYzZThkOGNhZTQ3IiwidW5pcXVlX25hbWUiOiJkZXZAbXlndXJ1a29vbC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJkZXZAbXlndXJ1a29vbC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiI3UTJXUHM2RzNVdXRzT3FKQ2N5NkFBIiwidmVyIjoiMS4wIiwieG1zX3N0Ijp7InN1YiI6InpoaEtya2NFVWJQdHVnVWlOSTFoSFprSW9UMFJWbV8wT3BueS1xUDNxV3MifSwieG1zX3RjZHQiOjE1ODc4Mjg0ODJ9.OZARyI3MFsnAXsKzr-e_2RxXkCB-mUdRge5rG5cf2ENbAzjCgC_qRVwoOZLru1cIzelMIT2fY_EagE9tGvpfZ9eOVnwAUA7MBITp0Ng16uXJEFjigEzf2m8j1uq3Z6qdde_tTKseyzACbk2QkC64s2wjrQQb-Adk0Ix8-cMz8HfsVjXClj5NsC_Ia0V7e8UGo7ez9L7xZoqYUt8mT0HYQAjoteK71zY7egTNGGiUCpbcfnvni_J9MqzuhFrzz2ssep9ERvnh2M4oR4cZLH9Yq5bw7DSEjRowDX0G19gW8tmDyOXIQm0Bx42ekajz38YR2KhFyS_hfyEHHnptCJhgiQ');
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
	    		this.setState({ sections: response.data });
	    		this.state.sections && this.state.sections.value.map((key, i) =>
				  	axios.get(`https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/${key.id}/pages`,
								   // https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/sections/1-36c74283-6467-47a6-80b2-aed68b7e6b73/pages	 
    					{ params:{}, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
			    	).then( response => {
			    		this.setState({ exercise: response.data });
			    		console.log(this.state.exercise);
			    	})
				)
	    		
	    	})
    	});

    	
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
								
								<Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>

								    <TabList>
								    	{
											this.state.sections && this.state.sections.value.map((key, i) =>
											  <Tab>{key.displayName}</Tab>
											)
										}
								    </TabList>
							 		
									{
										this.state.sections && this.state.sections.value.map((key, i) =>
										  	<TabPanel>
												    {
														this.state.exercise && this.state.exercise.value.map((exe, i) =>
														  
													        	<div className="alert alert-warning">{exe.title}</div>
														)
													}
									    	</TabPanel>
										)

									}
									
									
							  </Tabs>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}