import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Layout from "./hoc/Layout";
import Home from './components/Home/home';
import JobAdd from './containers/Admin/addJob';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/user/add" exact component={JobAdd}/>
                {/*<Route path="/jobAdds/add" exact component={AddJobAdView}/>*/}
                {/*<Route path="/jobAdds:id" exact component={JobAddView}/>*/}
            </Switch>
        </Layout>
    );
};

export default Routes;