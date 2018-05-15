import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
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
                                     color:'white',
                                     marginTop:'10px',
                                     marginLeft:'30px',
                                     cursor:'pointer'
                                 }}
                    />
                </div>
                <Nav
                    showNav={this.state.showNav}
                    onHideNav={()=>this.onHideNav()}
                />
            </header>
        );
    }
}

export default Header;