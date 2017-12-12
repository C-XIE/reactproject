import React from 'react';
import { connect } from 'dva';
import Indexinfo from '../infoComponent/Index.js';

import FindIndex from "../childrenComponents/findComponent/Index";

function Find({ location }) {
    return (
        <Indexinfo location={location}>
            <FindIndex></FindIndex>
        </Indexinfo>
    );
}

Find.propTypes = {
};

export default connect()(Find);