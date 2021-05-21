/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import { Context } from './../context';
import { core } from 'nexus';
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void; // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "DateTime";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenObjects {
  AuthPayload: {
    // root type
    message?: string | null; // String
    status?: number | null; // Int
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  };
  Category: {
    // root type
    id?: number | null; // Int
    isActive?: boolean | null; // Boolean
    name?: string | null; // String
  };
  DeleteUserPayload: {
    // root type
    message?: string | null; // String
    status?: string | null; // String
  };
  Expense: {
    // root type
    date?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    id?: number | null; // Int
    value?: number | null; // Int
  };
  Income: {
    // root type
    date?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    id?: number | null; // Int
    value?: number | null; // Int
  };
  Item: {
    // root type
    description?: string | null; // String
    expense?: Array<NexusGenRootTypes['Expense'] | null> | null; // [Expense]
    id?: number | null; // Int
    itemBudget?: number | null; // Int
  };
  ItemExpense: {
    // root type
    description?: string | null; // String
    id?: number | null; // Int
  };
  Mutation: {};
  OverviewMonthPayload: {
    // root type
    available?: number | null; // Int
    error?: string | null; // String
    incomes?: Array<NexusGenRootTypes['Income'] | null> | null; // [Income]
    lastExpense?: NexusGenRootTypes['Expense'] | null; // Expense
    notInBudget?: number | null; // Int
    savings?: number | null; // Int
    status?: number | null; // Int
  };
  Query: {};
  ResetPasswordPayload: {
    // root type
    message?: string | null; // String
    status?: string | null; // String
  };
  User: {
    // root type
    email?: string | null; // String
    id?: number | null; // Int
    name?: string | null; // String
    password?: string | null; // String
  };
  UserCategories: {
    // root type
    categories?: Array<NexusGenRootTypes['Category'] | null> | null; // [Category]
    error?: string | null; // String
    status?: number | null; // Int
  };
  UserMonth: {
    // root type
    categories?: Array<NexusGenRootTypes['UserMonthCategory'] | null> | null; // [UserMonthCategory]
    error?: string | null; // String
    id?: number | null; // Int
    savingCategories?: NexusGenRootTypes['UserMonthSavingCategory'] | null; // UserMonthSavingCategory
    status?: number | null; // Int
  };
  UserMonthCategory: {
    // root type
    category?: NexusGenRootTypes['Category'] | null; // Category
    id?: number | null; // Int
    items?: Array<NexusGenRootTypes['Item'] | null> | null; // [Item]
  };
  UserMonthSavingCategory: {
    // root type
    id?: number | null; // Int
    userMonthSavingItems?: Array<
      NexusGenRootTypes['UserMonthSavingItem'] | null
    > | null; // [UserMonthSavingItem]
  };
  UserMonthSavingItem: {
    // root type
    id?: number | null; // Int
    sent?: boolean | null; // Boolean
    value?: number | null; // Int
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars;

export interface NexusGenFieldTypes {
  AuthPayload: {
    // field return type
    message: string | null; // String
    status: number | null; // Int
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  };
  Category: {
    // field return type
    id: number | null; // Int
    isActive: boolean | null; // Boolean
    name: string | null; // String
  };
  DeleteUserPayload: {
    // field return type
    message: string | null; // String
    status: string | null; // String
  };
  Expense: {
    // field return type
    date: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    id: number | null; // Int
    value: number | null; // Int
  };
  Income: {
    // field return type
    date: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    id: number | null; // Int
    value: number | null; // Int
  };
  Item: {
    // field return type
    description: string | null; // String
    expense: Array<NexusGenRootTypes['Expense'] | null> | null; // [Expense]
    id: number | null; // Int
    itemBudget: number | null; // Int
  };
  ItemExpense: {
    // field return type
    description: string | null; // String
    id: number | null; // Int
  };
  Mutation: {
    // field return type
    addCategory: NexusGenRootTypes['Category']; // Category!
    addExpense: NexusGenRootTypes['Expense']; // Expense!
    addIncome: NexusGenRootTypes['Income']; // Income!
    addUserMonthCategory: NexusGenRootTypes['Category']; // Category!
    deleteUser: NexusGenRootTypes['DeleteUserPayload']; // DeleteUserPayload!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    resetPassword: NexusGenRootTypes['ResetPasswordPayload']; // ResetPasswordPayload!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updatePassword: NexusGenRootTypes['ResetPasswordPayload']; // ResetPasswordPayload!
  };
  OverviewMonthPayload: {
    // field return type
    available: number | null; // Int
    error: string | null; // String
    incomes: Array<NexusGenRootTypes['Income'] | null> | null; // [Income]
    lastExpense: NexusGenRootTypes['Expense'] | null; // Expense
    notInBudget: number | null; // Int
    savings: number | null; // Int
    status: number | null; // Int
  };
  Query: {
    // field return type
    getItems: NexusGenRootTypes['ItemExpense'][] | null; // [ItemExpense!]
    getUser: NexusGenRootTypes['User']; // User!
    getUserCategories: NexusGenRootTypes['UserCategories']; // UserCategories!
    getUserMonth: NexusGenRootTypes['UserMonth']; // UserMonth!
    overviewMonth: NexusGenRootTypes['OverviewMonthPayload']; // OverviewMonthPayload!
  };
  ResetPasswordPayload: {
    // field return type
    message: string | null; // String
    status: string | null; // String
  };
  User: {
    // field return type
    email: string | null; // String
    id: number | null; // Int
    name: string | null; // String
    password: string | null; // String
  };
  UserCategories: {
    // field return type
    categories: Array<NexusGenRootTypes['Category'] | null> | null; // [Category]
    error: string | null; // String
    status: number | null; // Int
  };
  UserMonth: {
    // field return type
    categories: Array<NexusGenRootTypes['UserMonthCategory'] | null> | null; // [UserMonthCategory]
    error: string | null; // String
    id: number | null; // Int
    savingCategories: NexusGenRootTypes['UserMonthSavingCategory'] | null; // UserMonthSavingCategory
    status: number | null; // Int
  };
  UserMonthCategory: {
    // field return type
    category: NexusGenRootTypes['Category'] | null; // Category
    id: number | null; // Int
    items: Array<NexusGenRootTypes['Item'] | null> | null; // [Item]
  };
  UserMonthSavingCategory: {
    // field return type
    id: number | null; // Int
    userMonthSavingItems: Array<
      NexusGenRootTypes['UserMonthSavingItem'] | null
    > | null; // [UserMonthSavingItem]
  };
  UserMonthSavingItem: {
    // field return type
    id: number | null; // Int
    sent: boolean | null; // Boolean
    value: number | null; // Int
  };
}

export interface NexusGenFieldTypeNames {
  AuthPayload: {
    // field return type name
    message: 'String';
    status: 'Int';
    token: 'String';
    user: 'User';
  };
  Category: {
    // field return type name
    id: 'Int';
    isActive: 'Boolean';
    name: 'String';
  };
  DeleteUserPayload: {
    // field return type name
    message: 'String';
    status: 'String';
  };
  Expense: {
    // field return type name
    date: 'DateTime';
    description: 'String';
    id: 'Int';
    value: 'Int';
  };
  Income: {
    // field return type name
    date: 'DateTime';
    description: 'String';
    id: 'Int';
    value: 'Int';
  };
  Item: {
    // field return type name
    description: 'String';
    expense: 'Expense';
    id: 'Int';
    itemBudget: 'Int';
  };
  ItemExpense: {
    // field return type name
    description: 'String';
    id: 'Int';
  };
  Mutation: {
    // field return type name
    addCategory: 'Category';
    addExpense: 'Expense';
    addIncome: 'Income';
    addUserMonthCategory: 'Category';
    deleteUser: 'DeleteUserPayload';
    login: 'AuthPayload';
    resetPassword: 'ResetPasswordPayload';
    signup: 'AuthPayload';
    updatePassword: 'ResetPasswordPayload';
  };
  OverviewMonthPayload: {
    // field return type name
    available: 'Int';
    error: 'String';
    incomes: 'Income';
    lastExpense: 'Expense';
    notInBudget: 'Int';
    savings: 'Int';
    status: 'Int';
  };
  Query: {
    // field return type name
    getItems: 'ItemExpense';
    getUser: 'User';
    getUserCategories: 'UserCategories';
    getUserMonth: 'UserMonth';
    overviewMonth: 'OverviewMonthPayload';
  };
  ResetPasswordPayload: {
    // field return type name
    message: 'String';
    status: 'String';
  };
  User: {
    // field return type name
    email: 'String';
    id: 'Int';
    name: 'String';
    password: 'String';
  };
  UserCategories: {
    // field return type name
    categories: 'Category';
    error: 'String';
    status: 'Int';
  };
  UserMonth: {
    // field return type name
    categories: 'UserMonthCategory';
    error: 'String';
    id: 'Int';
    savingCategories: 'UserMonthSavingCategory';
    status: 'Int';
  };
  UserMonthCategory: {
    // field return type name
    category: 'Category';
    id: 'Int';
    items: 'Item';
  };
  UserMonthSavingCategory: {
    // field return type name
    id: 'Int';
    userMonthSavingItems: 'UserMonthSavingItem';
  };
  UserMonthSavingItem: {
    // field return type name
    id: 'Int';
    sent: 'Boolean';
    value: 'Int';
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    addCategory: {
      // args
      name: string; // String!
    };
    addExpense: {
      // args
      description: string; // String!
      itemId: number; // Int!
      value: number; // Int!
    };
    addIncome: {
      // args
      description: string; // String!
      userMonthId: number; // Int!
      value: number; // Int!
    };
    addUserMonthCategory: {
      // args
      categoryId: number; // Int!
      userMonthId: number; // Int!
    };
    deleteUser: {
      // args
      token: string; // String!
    };
    login: {
      // args
      email: string; // String!
      password: string; // String!
    };
    resetPassword: {
      // args
      email: string; // String!
    };
    signup: {
      // args
      email: string; // String!
      password: string; // String!
    };
    updatePassword: {
      // args
      password: string; // String!
      token: string; // String!
    };
  };
  Query: {
    getItems: {
      // args
      categoryId: number; // Int!
    };
    getUser: {
      // args
      token: string; // String!
    };
    getUserMonth: {
      // args
      month: string; // String!
    };
    overviewMonth: {
      // args
      month: string; // String!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
