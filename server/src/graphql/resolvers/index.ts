//@ts-ignore
import userResolver from './user.ts';
import merge from "lodash.merge"

export const resolvers = merge({}, userResolver)

// export default resolvers