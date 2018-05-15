import React from 'react';
import Header from '../components/Header/header';
import { Grid, Button, Image } from 'semantic-ui-react';
import logoImage from '../assets/images/img3.png';

const Layout = (props) => {
    return (
        <Grid columns='equal' divided inverted padded>
          <Grid.Row style={{backgroundColor:'#07009B'}}>
            <Grid.Column floated='left'>
              <Header/>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Image centered src={logoImage} size='small'/>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Button circular primary floated='right'>Log In</Button>
              <Button circular secondary floated='right'>Register</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {props.children}
          </Grid.Row>
        </Grid>
    )
};

export default Layout;