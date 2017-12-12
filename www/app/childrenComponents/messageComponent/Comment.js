import React from "react";
import classnames from "classnames";
import { connect } from "dva";

class Comment extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: ""
        }
    }
    render() {
        const { feedback, addcomment, _id, hideinput } = this.props;
        const more = this.props.more;
        return <div className="comment">
            {
                feedback.map((item, index) => {
                    return <div className="commentitem" key={index}>
                        <div>
                            <span className="commentemail">来自{item.email}</span>
                            <p>{item.comment}</p>
                            <hr />
                        </div>
                    </div>
                })
            }
            {
                this.props.hideinput ?
                    null
                    :
                    <div>
                        <input
                            placeholder="写下你的评论"
                            value={this.state.txt}
                            onChange={(e) => { this.setState({ "txt": e.target.value }) }}
                        />
                        <button onClick={() => { addcomment(_id, this.state.txt); this.setState({ "txt": "" }) }}>评论</button>
                    </div>
            }
        </div>
    }
}
export default connect()(Comment);