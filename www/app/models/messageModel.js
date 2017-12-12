export default {
    "namespace": "message",
    "state": {
        //每次根据pagesize 拉取的数据
        result: null,
        //所有的 留言数量
        count: 0,
        //将用户收藏 后的留言 存入
        save: []
    },
    "reducers": {
        init(state, { count, result ,a}) {
            //根据a 判断是否是换 页还是 第一次获取初始数据
            //第一次 初始数据 只留下第一页的的收藏留言
            if(a){
                
                return {
                    ...state,
                    count, result,
                    save:result.filter((item)=>{
                        return item.saveit == true;
                    })
                }
            }else{
                //如果换页 则继续将留言 加入里面
                let savearr = state.save;
                result.forEach((item)=>{
                    if(item.saveit)
                    savearr.push(item)
                })
                return {
                    ...state,
                    count, result,
                    save: savearr
                }
            }
        },
        add(state, { result }) {
            return {
                ...state,
                "result": [
                    result,
                    ...state.result
                ]
            }
        },
        save(state, { result, bool }) {
            // 收藏与取消收藏  根据传入的bool参数判断  并排除重复点击收藏
            if (bool) {
                let count = 0;
                state.save.forEach((item) => {
                    if (item._id == result[0]._id) {
                        count++;
                    }
                })
                if(count == 0){
                    return {
                        ...state,
                        save: [
                            ...state.save,
                            result[0]
                        ]
                    }
                }else{
                    return {
                        ...state
                    }
                }
            } else {
                return {
                    ...state,
                    save: state.save.filter((item) => {
                        return item._id != result[0]._id
                    })
                }
            }
        },
        zan(state, { result}) {
            // 点赞后增加 赞的数量
            return {
                ...state,
                result: state.result.map((item) => {

                    if (item._id == result._id) {
                        return {
                            ...result
                        }
                    }
                    return item;
                }),
                save: state.save.map((item) => {
                    if (item._id == result._id) {
                        return {
                            ...item,
                            zan: result.zan
                        }
                    }
                    return item;
                })
            }
        },
        addcomment(state, { _id, comment, result }) {
            return {
                ...state,
                result: state.result.map((item) => {
                    if (item._id == _id) {
                        return {
                            ...result
                        }
                    }
                    return item;
                }),
                save:state.save.map((item)=>{
                    if(item._id == _id){
                        return {
                            ...result
                        }
                    }
                    return item;
                })
            }
        }
    },
    "effects": {
        *init_async({currentpage,a}, { put, select, call }) {
            const { result, count } = yield fetch("/message/"+currentpage).then(data => data.json());
            yield put({ "type": "init", count, result,currentpage,a})
        },
        *add_async({ message}, { put, call, select }) {
            const { result } = yield fetch("/message/add", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ message})
            }).then(data => data.json());
            yield put({ "type": "add", result })
        },
        *save_async({ _id, bool }, { put, call, select }) {
            const { result } = yield fetch("/message/save", {
                "method": "PATCH",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ _id, bool })
            }).then(data => data.json());
            yield put({ "type": "save", result, bool })
        },
        *zan_async({ _id, num }, { put }) {
            const { result } = yield fetch("/message/zan", {
                "method": "PATCH",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ _id, num })
            }).then(data => data.json());
            yield put({ "type": "zan", "result": result[0]});
        },
        *addcomment_async({ _id, comment }, { put }) {
            const { result } = yield fetch("/message/comment", {
                "method": "PATCH",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ _id, comment })
            }).then(data => data.json());
            yield put({ "type": "addcomment", _id, comment, result: result[0] });
        }
    }
}