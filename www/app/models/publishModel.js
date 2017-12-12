export default {
    'namespace': "publish",
    'state': {
        
    },
    'reducers': {
        add(state,{content}){
            console.log(content);
            return {
                ...state
            }
        }
    },
    'effects': {
        *add_async({content},{put,select}){
            const {result} = yield fetch("/find/add",{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json"
                },
                "body":JSON.stringify(content)
            });
            yield result==1 && put({"type":"add",content}); 
        }
    }
}