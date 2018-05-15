import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import { Card, Grid, Image } from 'semantic-ui-react';
import entryImage from '../assets/images/img1.jpg';

class HomeContainer extends Component {

  componentWillMount() {
    this.props.fetchJobAdds();
  }

  render() {
    console.log("adds are", this.props.jobAdds);
    let content = (
      <Grid>
        <Grid.Row>
          <Image src={entryImage} centered size='huge'/>
        </Grid.Row>
        <Grid.Row>
          {this.props.jobAdds.map( jobAdd => {
            console.log(jobAdd);
            return(
              <Grid.Column textAlign="center">
                <Card centered>
                  {jobAdd['category']}
                </Card>
              </Grid.Column>
            )
          })
          }
        </Grid.Row>
      </Grid>
    );

    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.jobs.loading,
    jobAdds: state.jobs.jobAdds
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchJobAdds: () => dispatch(actions.fetchJobAdds())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);