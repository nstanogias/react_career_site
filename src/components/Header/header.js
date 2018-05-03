import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './SideNav/sidenav';

class Header extends Component {

    state = {
        showNav:false
    };

    onHideNav = () => {
        this.setState({showNav:false})
    };


    render() {
        return (
            <header>
                <div>
                    <FontAwesome name="bars"
                                 onClick={()=> this.setState({showNav:true})}
                                 style={{
                                     color:'blue',
                                     padding:'10px',
                                     cursor:'pointer'
                                 }}
                    />
                </div>
                <Nav
                    showNav={this.state.showNav}
                    onHideNav={()=>this.onHideNav()}
                />

                <Link to="/" className="logo">
                    Careers
                </Link>

            </header>
        );
    }
}

export default Header;