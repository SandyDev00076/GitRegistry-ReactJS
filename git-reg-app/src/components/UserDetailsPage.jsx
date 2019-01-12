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
        user_followers: 0,
        user_createdat: "",
        user_updatedat: "",
        user_type: "",
        repos: []
    }
    render() {
        console.log('User Details Page is Rendered..!');

        let createdat = this.state.user_createdat;
        let updatedat = this.state.user_updatedat;
    
        return (<React.Fragment>
            <nav className="navbar navbar-light bg-light">
                <a href={this.state.user_url} className="navbar-brand" style={{ fontFamily: "aaramfont" }}><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="githublogo" style={{ width: "50px", height: "50px" }}/> / {this.props.location.state.user}</a>
            </nav>
            <div className="detailcontainer">
                <div>
                    <a href={this.state.user_url}><img src={this.state.user_avatar} alt="No Profile Photo" className="userpic"/></a>
                    <br/>
                    <div className="card userfooter">
                        <h6 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#008080" }}>Bio</h6>
                        <span className="userbio">{(this.state.user_bio) ? this.state.user_bio : <span className="userbio" style={{ color: "red" }}>-NA-</span>}</span>
                    </div>
                </div>
                <div className="card userdetails">
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#FF0000" }}>Name</h6>
                    <span className="userdet">{(this.state.user_name) ? this.state.user_name : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                    <br/>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#4FA04F" }}>Location</h6>
                    <span className="userdet">{(this.state.user_location) ? this.state.user_location : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                    <br/>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#A04FA0" }}>Company</h6>
                    <span className="userdet">{(this.state.user_company) ? this.state.user_company : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                    <br/>
                    <h6 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#DC7633" }}>Type</h6>
                    <span className="userdet">{(this.state.user_type) ? this.state.user_type : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                </div>
                <div>
                    <div className="card publicrepos">
                        <h1 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#99A3A4" }}>Public Repos</h1>
                        <span className="userrepos">{(this.state.public_repos === 0) ? <span style={{ color: "red" }}>0</span> : this.state.public_repos}</span>
                    </div>
                    <br/>
                    <div className="card publicrepos">
                        <h1 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#27AE60" }}>Followers</h1>
                        <span className="userrepos">{(this.state.user_followers === 0) ? <span style={{ color: "red" }}>0</span> : this.state.user_followers}</span>
                    </div>
                </div>
                <div>
                    <div id="reposcomp" className="card repos">
                        <h2 className="card-subtitle" style={{ fontFamily: "aaramfont", marginBottom: "5px", color: "#5874DE" }}>Repos</h2>
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
                    <br/>
                    <div className="card userdetails">
                        <h6 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#34495E" }}>Last Updated On</h6>
                        <span className="userdet" style={{ fontSize: "20px" }}>{(this.state.user_updatedat) ? updatedat.split('T')[0] : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                        <br/>
                        <h6 className="card-subtitle" style={{ fontFamily: "aaramfont", color: "#4FA04F" }}>Profile Created On</h6>
                        <span className="userdet" style={{ fontSize: "20px" }}>{(this.state.user_createdat) ? createdat.split('T')[0] : <span className="userdet" style={{ color: "red" }}>-NA-</span>}</span>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
    componentWillMount() {
        axios.get('https://api.github.com/users/' + this.props.location.state.user).then(res => {
            this.setState({ public_repos: res.data.public_repos, 
                user_name: res.data.name, 
                user_avatar: res.data.avatar_url, 
                user_bio: res.data.bio, 
                user_email: res.data.email, 
                user_location: res.data.location, 
                user_url: res.data.html_url, 
                user_company: res.data.company, 
                repos_url: res.data.repos_url, 
                user_followers: res.data.followers,
                user_createdat: res.data.created_at,
                user_updatedat: res.data.updated_at,
                user_type: res.data.type }, () => {
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