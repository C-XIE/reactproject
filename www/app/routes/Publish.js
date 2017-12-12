import React from 'react';
import { connect } from 'dva';
import Indexinfo from '../infoComponent/Index.js';

import PublishIndex from "../childrenComponents/publishComponent/Index"; 

function Publish({ location }) {
    return (
        <Indexinfo location={location}>
            <PublishIndex></PublishIndex>
        </Indexinfo>
    );
}

Publish.propTypes = {
};

export default connect()(Publish);