import React, { Component } from 'react';
import './UserEntryPage.css';

class UserEntry extends Component {
    state = {
        username: ''
    }
    render() { 
        console.log('User Entry Page Rendered!');
        return (<React.Fragment>
            <div className="container">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github Logo" className="imagegit"></img>
                <br/>
                <span className="intro1">Welcome to the <span className="gitreg">Git Registry</span>.</span>
                <br/>
                <br/>
                <span className="intro2">Please enter your Git username.</span>
                <br/>
                <input style={{ marginTop: "10px", marginBottom: "10px" }} spellCheck="false" className="userinput" placeholder="Enter Username"/>
                <br/>
                <button style={{ fontSize: "30px", letterSpacing: "8px", textAlign: "center", fontFamily: "aaramfont" }} className="btn btn-outline-warning mt-5 mr-5 ml-5 mb-2">Fetch Details</button>
                <br/>
                <span className="bottomtip">And we will get everything ready for you!</span>
            </div>
        </React.Fragment>);
    }
    usernameChanged = (evt) => {
        const username = evt.target.value;
        this.setState({ username });
    }
}
 
export default UserEntry;