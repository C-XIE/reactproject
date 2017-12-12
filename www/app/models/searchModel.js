export default {
    'namespace': "search",
    'state': {
        "find": [],
        "result":[],
        "count":0,
        "page":1,
        "pageSize":10
    },
    'reducers': {
        addtag_store(state, { k, v, cnname }) {

            //遍历find数组，查看是否已经存在
            //如果存在则修改 不存在则增加 根据k
            let isexit = false;
            state.find.forEach((item)=>{
                if(item.tagname == k){
                    isexit = true;
                }
            })
            if(!isexit){
                return {
                    ...state,
                    "find": [
                        ...state.find,
                        {
                            tagname: k,
                            cont: v,
                            cnname,
                        }
                    ],
                    "page":1
                }
            }else{
                return {
                    ...state,
                    "find":state.find.map((item,index)=>{
                        if(item.tagname == k){
                            return {
                                ...item,
                                cont:v,
                                cnname
                            }
                        }
                        return item;
                    }),
                    "page":1
                }
            }
        },
        getResult(state,{result,count,pageSize}){
           if(pageSize){
               return {
                   ...state,
                   result, count, pageSize
               }
           }else{
               return {
                   ...state,
                   result,count
               }
           }
        }
        ,
        deletetag_store(state, { k }) {
            return {
                ...state,
                "find": state.find.filter((item)=>{
                    return item.tagname!=k;
                }),
                "page":1
            }
        },
        changepage_store(state,{page,pageSize}){
            return {
                ...state,
                page,pageSize
            }
        }
    },
    'effects': {
        *init_async(action,{put,select}){
            const {result,count} = yield fetch("/api").then(data=>data.json());
            yield put({"type":"getResult",result,count});
        },
        *addtag({ k, v, cnname },{put,select,call}){
            let find = yield select(state=>state.search.find);
             let queryObj = {};
             find.forEach((item)=>{
                 checkTagname(item,queryObj);
             })
            yield checkTagname({"tagname":k,"cont":v}, queryObj);
            
            const {result,count} = yield fetch("/api?"+Object.values(queryObj).join("&")).then(data=>data.json());
            yield put({"type":"addtag_store",k,v,cnname});  
            yield put({"type":"getResult",result,count});
        },
        *deletetag({ k }, { put, select, call }) {
            let find = yield select(state => state.search.find);
            let queryObj = {};
            find.forEach((item) => {
                checkTagname(item, queryObj);
            })
            delete queryObj[k];
            const { result,count } = yield fetch("/api?" + Object.values(queryObj).join("&")).then(data => data.json());
            yield put({ "type": "deletetag_store", k });
            yield put({ "type": "getResult", result, count});
        },
        *changepage({page,pageSize},{put,select}){
            let find = yield select(state => state.search.find);
            let queryObj = {};
            find.forEach((item) => {
                checkTagname(item, queryObj);
            })
            const { result, count } = yield fetch("/api?"+`page=${page}&pagesize=${pageSize}`+Object.values(queryObj).join("&")).then(data => data.json());
            yield put({"type":"changepage_store",page,pageSize});
            yield put({ "type": "getResult", result, count,pageSize });
        }
    }
}
function checkTagname(item,queryObj){
    if (item.tagname == "type" || item.tagname == "group") {
        queryObj[item.tagname]=`${item.tagname}=${item.cont}`;
    }
    if (item.tagname == "money") {
        queryObj[item.tagname]=`${item.tagname}=[${item.cont[0]},${item.cont[1]}]`;
    }
    if (item.tagname == "fom" || item.tagname == "color" || item.tagname == "rom") {
        queryObj[item.tagname]=`${item.tagname}=${JSON.stringify(item.cont)}`;
    }
}