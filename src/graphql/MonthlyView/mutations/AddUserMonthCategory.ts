// import { nonNull, extendType, intArg } from 'nexus';

// import { checkAuth } from '../../../utils/checkAuth';

// export const AddUserMonthCategory = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('addUserMonthCategory', {
//       type: 'Category',
//       args: {
//         categoryId: nonNull(intArg()),
//         userMonthId: nonNull(intArg()),
//       },
//       async resolve(_root, { categoryId, userMonthId }, { db, req }) {
//         // checkAuth(req);
//       },
//     });
//   },
// });
