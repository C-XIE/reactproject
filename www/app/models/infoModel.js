export default {
    'namespace': "info",
    'state': {
        city:{},
        money:{}
    },
    'reducers': {
        init(state, {resultcity,resultmoney}) {
            return {
                ...state,
                city:resultcity,
                money:resultmoney
            }
        }
    },
    'effects': {
        *init_async({ payload }, { call, put }) {
            const {resultcity} = yield fetch("/info/job").then(data=>data.json());
            const {resultmoney} = yield fetch("/info/money").then(data=>data.json());
            yield put({"type":"init",resultcity,resultmoney})
        }
    }
}