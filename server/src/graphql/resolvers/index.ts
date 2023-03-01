//@ts-ignore
import userResolver from './user.ts';
import merge from "lodash.merge"


const resolvers = merge({}, userResolver)

export default resolvers