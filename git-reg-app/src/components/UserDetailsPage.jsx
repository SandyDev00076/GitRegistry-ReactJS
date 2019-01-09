import React, { Component } from 'react';
import axios from 'axios';
import './UserDetailsPage.css';

class UserDetails extends Component {
    state = {
        user_avatar: "",
        public_repos: 0,
        user_url: "",
        user_name: "",
        user_location: "",
        user_bio: "",
        user_email: "",
        user_company: ""
    }
    render() {
        console.log('User Details Page is Rendered..!');
        console.log(this.props.location.state.user);
    
        return (<React.Fragment>
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand" style={{ fontFamily: "aaramfont" }}><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="githublogo" style={{ width: "50px", height: "50px" }}/> / {this.props.location.state.user}</span>
            </nav>
            <div className="detailcontainer">
                <img src={this.state.user_avatar} alt="No Profile Photo" className="userpic"/>
                <div className="card" style={{ marginLeft: "30px", padding: "20px" }}>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Name</h6>
                    <span className="userdet">{this.state.user_name}</span>
                    <br/>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Location</h6>
                    <span className="userdet">{this.state.user_location}</span>
                    <br/>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Company</h6>
                    <span className="userdet">{this.state.user_company}</span>
                </div>
            </div>
        </React.Fragment>);
    }
    componentDidMount() {
        axios.get('https://api.github.com/users/' + this.props.location.state.user).then(res => {
            this.setState({ user_name: res.data.name, user_avatar: res.data.avatar_url, user_bio: res.data.bio, user_email: res.data.email, user_location: res.data.location, user_url: res.data.html_url, user_company: res.data.company }, () => {
                console.log('User Name - ' + this.state.user_name);
            });
        });
    }
}
 
export default UserDetails;