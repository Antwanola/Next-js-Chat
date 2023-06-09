//@ts-ignore
import userResolver from './user.ts';
//@ts-ignore
import convoResolver from './conversations.ts'
//@ts-ignore
import messageResolver from './messages.ts'
import merge from "lodash.merge"

const resolvers = merge({}, userResolver, convoResolver, messageResolver)

export default resolvers