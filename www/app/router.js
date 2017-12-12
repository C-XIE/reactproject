import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

import IndexPage from './routes/IndexPage';
import Find from './routes/Find';
import Publish from './routes/Publish';
import Message from './routes/Message';

// import search from "./models/searchModel";
import info from "./models/infoModel";
import publish from "./models/publishModel";
import search from "./models/searchModel";
import message from "./models/messageModel";

// import searchModel from './models/searchModel.js';
// app.model(searchModel);

function RouterConfig({ history,app}) {
    const indexpage = dynamic({
        app,
        models: () => [info],
        component: () => IndexPage
    });
    const findpage = dynamic({
        app,
        models: () => [search],
        component: () => Find
    });
    const publishpage = dynamic({
        app,
        models: () => [publish],
        component: () => Publish
    });
    const messagepage = dynamic({
        app,
        models:()=>[message],
        component:()=> Message
    })
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={indexpage} />
                <Route path="/publish" component={publishpage} />
                <Route path="/find" component={findpage} />
                <Route path="/message" component={messagepage} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;