//@ts-ignore
import userResolver from './user.ts';
//@ts-ignore
import convoResolver from './conversations.ts'
import merge from "lodash.merge"

const resolvers = merge({}, userResolver, convoResolver)

export default resolvers