let TOPIC_ID_INIT = 10001;
const topics = [];
class Topic{
    constructor(params){
        if(!params.creater) throw {code:-1,msg:'a topic must send by creater'}
        if(!params.title) throw {code:-1,msg:'a topic must contain a title'}
        if(params.content.length<5) throw {code:-1,msg:'a topic’s content  must be  longer than 5'}
        this.title = params.title;
        this.content = params.content;
        this._id = TOPIC_ID_INIT++;
        // 回复
        this.replyList = [];
    }

}

async function createANewTopic(params){
    const topic =  new Topic(params);
    topics.push(topic);
    return topic;
}

async function getTopics(){
    return topics;
} 

async function getTopicById(topicId){
    return topics.find(u=>u._id === Number(topicId));
} 

async function updateTopicById(topicId,update){
    const topic =  topics.find(u=>u._id === Number(topicId));
    if(update.name) topic.name = update.name;
    if(update.age) topic.age = update.age;
    return topic;
}

// 回帖
async function replyATopic(params){
    console.log('回帖接口进入')
    console.log(params)
    const topic = topics.find(t=>t._id===Number(params.topicId));
    topic.replyList.push(
        {
            creater:params.creater,
            content:params.content,
        }
    )
    return topic;
}

module.exports = {
    model:Topic,
    createANewTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    replyATopic
}