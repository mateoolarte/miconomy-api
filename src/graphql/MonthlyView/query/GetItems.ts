// import { nonNull, extendType, intArg } from 'nexus';

// import { checkAuth } from '../../../utils/checkAuth';

// export const GetItems = extendType({
//   type: 'Query',
//   definition(t) {
//     t.list.nonNull.field('getItems', {
//       type: 'ItemExpense',
//       args: {
//         categoryId: nonNull(intArg()),
//       },
//       async resolve(_root, { categoryId }, { db, req }) {
//         checkAuth(req);

//         const defaultResponse = [];

//         try {
//           const userItems = await db.item.findMany({
//             where: {
//               userMonthCategoryId: categoryId,
//             },
//           });

//           return userItems;
//         } catch (error) {
//           return defaultResponse;
//         }
//       },
//     });
//   },
// });
