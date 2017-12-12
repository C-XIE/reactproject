import React from 'react';
import { connect } from 'dva';
import Indexinfo from '../infoComponent/Index.js';

import Index from "../index";

function IndexPage({ location }) {
    return (
        <Indexinfo location={location}>
            <Index></Index>
        </Indexinfo>
    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);