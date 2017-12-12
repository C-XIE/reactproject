import React from 'react';
import { connect } from 'dva';
import Indexinfo from '../infoComponent/Index.js';
import MessageIndex from "../childrenComponents/messageComponent/Index";

function Message({ location }) {
    return (
        <Indexinfo location={location}>
            <MessageIndex></MessageIndex>
        </Indexinfo>
    );
}

Message.propTypes = {
};

export default connect()(Message);