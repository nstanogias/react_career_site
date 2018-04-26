import React from 'react';

import { Switch, Route } from 'react-router-dom';

const Routes = () => {
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/jobAdds" exact component={jobAddViewList}/>
        <Route path="/jobAdds/add" exact component={AddJobAdView}/>
        <Route path="/jobAdds:id" exact component={JobAddView}/>
    </Switch>
};

export default Routes;