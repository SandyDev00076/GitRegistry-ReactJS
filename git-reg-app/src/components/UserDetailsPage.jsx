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
        user_company: "",
        repos_url: "",
        repos: []
    }
    render() {
        console.log('User Details Page is Rendered..!');
        console.log(this.props.location.state.user);
    
        return (<React.Fragment>
            <nav className="navbar navbar-light bg-light">
                <a href={this.state.user_url} className="navbar-brand" style={{ fontFamily: "aaramfont" }}><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="githublogo" style={{ width: "50px", height: "50px" }}/> / {this.props.location.state.user}</a>
            </nav>
            <div className="detailcontainer">
                <div>
                    <img src={this.state.user_avatar} alt="No Profile Photo" className="userpic"/>
                    <br/>
                    <div className="card" style={{ boxShadow: "0 0 5px grey", width: "300px", padding: "20px", marginTop: "15px" }}>
                        <h6 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Bio</h6>
                        <span className="userbio">{(this.state.user_bio) ? this.state.user_bio : <span className="userbio" style={{ color: "red" }}>-NA-</span>}</span>
                    </div>
                </div>
                <div className="card" style={{ marginLeft: "30px", padding: "20px", boxShadow: "0 0 5px 0 grey" }}>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Name</h6>
                    <span className="userdet">{(this.state.user_name) ? this.state.user_name : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                    <br/>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Location</h6>
                    <span className="userdet">{(this.state.user_location) ? this.state.user_location : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                    <br/>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Company</h6>
                    <span className="userdet">{(this.state.user_company) ? this.state.user_company : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                </div>
                <div className="card" style={{ textAlign: "center", marginLeft: "30px", padding: "20px", boxShadow: "0 0 5px 0 grey" }} data-toggle="collapse" data-target="#collapseRepos">
                    <h1 className="card-subtitle" style={{ fontFamily: "aaramfont" }}>Public Repos</h1>
                    <span className="userrepos">{(this.state.public_repos === 0) ? <span style={{ color: "red" }}>0</span> : this.state.public_repos}</span>
                </div>
                <div className="card" style={{ marginLeft: "30px", padding: "20px", boxShadow: "0 0 5px 0 grey" }}>
                    <h2 className="card-subtitle" style={{ fontFamily: "aaramfont", marginBottom: "5px" }}>Repos</h2>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {
                        (this.state.repos.length === 0) ? <span style={{ fontFamily: "aaramfont", fontSize: "12px" }}>No Repos</span> :
                        this.state.repos.map(item => {
                            return (<div className="repoItem">
                                <a data-toggle="tooltip" data-placement="top" title={ item.description } style={{ fontFamily: "aaramfont", fontSize: "18px" }} href={ item.html_url }>{ item.name }</a>
                                <br/>
                                <span style={{ fontFamily: "aaramfont", fontSize: "12px" }}>{ (item.language) ? item.language : "Not known" }</span>
                            </div>)
                        })
                    }
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
    componentDidMount() {
        axios.get('https://api.github.com/users/' + this.props.location.state.user).then(res => {
            this.setState({ public_repos: res.data.public_repos, user_name: res.data.name, user_avatar: res.data.avatar_url, user_bio: res.data.bio, user_email: res.data.email, user_location: res.data.location, user_url: res.data.html_url, user_company: res.data.company, repos_url: res.data.repos_url }, () => {
                console.log('User Name - ' + this.state.user_name);

                // fetch the repos of the user
                axios.get(res.data.repos_url).then(resp => {
                    this.setState({ repos: resp.data }, () => {
                        console.log(this.state.repos);
                    });
                });
            });
        });
    }
}
 
export default UserDetails;