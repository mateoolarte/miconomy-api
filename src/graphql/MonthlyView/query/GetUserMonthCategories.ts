// import { nonNull, intArg, extendType } from 'nexus';

// import { checkAuth } from '../../../utils/checkAuth';

// export const GetUserMonthCategories = extendType({
//   type: 'Query',
//   definition(t) {
//     t.list.nonNull.field('getUserMonthCategories', {
//       type: 'UserMonthCategory',
//       args: {
//         userMonthId: nonNull(intArg()),
//       },
//       async resolve(_root, { userMonthId }, { db, req }) {
//         checkAuth(req);

//         const defaultResponse = [];

//         try {
//           const categories = await db.userMonthCategory.findMany({
//             where: {
//               userMonthId,
//             },
//             include: {
//               category: true,
//               items: {
//                 include: {
//                   expense: true,
//                 },
//               },
//             },
//           });

//           return categories;
//         } catch (error) {
//           return {
//             ...defaultResponse,
//           };
//         }
//       },
//     });
//   },
// });
