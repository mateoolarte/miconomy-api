/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../../config/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Budget: { // root type
    categories?: Array<NexusGenRootTypes['CategoryBudget'] | null> | null; // [CategoryBudget]
    id?: number | null; // Int
    name?: string | null; // String
    savings?: Array<NexusGenRootTypes['SavingBudget'] | null> | null; // [SavingBudget]
  }
  Category: { // root type
    id?: number | null; // Int
    name?: string | null; // String
  }
  CategoryBudget: { // root type
    amount?: number | null; // Int
    id?: number | null; // Int
    name?: string | null; // String
  }
  CategoryEntry: { // root type
    amount?: number | null; // Int
    expenses?: Array<NexusGenRootTypes['Expense'] | null> | null; // [Expense]
    id?: number | null; // Int
    name?: string | null; // String
  }
  Entry: { // root type
    categories?: Array<NexusGenRootTypes['CategoryEntry'] | null> | null; // [CategoryEntry]
    id?: number | null; // Int
    savings?: Array<NexusGenRootTypes['SavingEntry'] | null> | null; // [SavingEntry]
  }
  Expense: { // root type
    description?: string | null; // String
    id?: number | null; // Int
    updatedAt?: string | null; // String
    value?: number | null; // Int
  }
  Income: { // root type
    id?: number | null; // Int
    value?: number | null; // Int
  }
  Mutation: {};
  Query: {};
  Saving: { // root type
    goal?: number | null; // Int
    id?: number | null; // Int
    name?: string | null; // String
    type?: string | null; // String
    value?: number | null; // Int
  }
  SavingBudget: { // root type
    fee?: number | null; // Int
    id?: number | null; // Int
    name?: string | null; // String
    type?: string | null; // String
  }
  SavingEntry: { // root type
    fee?: number | null; // Int
    id?: number | null; // Int
    name?: string | null; // String
    sent?: boolean | null; // Boolean
    type?: string | null; // String
  }
  User: { // root type
    currencyCode?: string | null; // String
    email?: string | null; // String
    id?: number | null; // Int
    password?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Budget: { // field return type
    categories: Array<NexusGenRootTypes['CategoryBudget'] | null> | null; // [CategoryBudget]
    id: number | null; // Int
    name: string | null; // String
    savings: Array<NexusGenRootTypes['SavingBudget'] | null> | null; // [SavingBudget]
  }
  Category: { // field return type
    id: number | null; // Int
    name: string | null; // String
  }
  CategoryBudget: { // field return type
    amount: number | null; // Int
    id: number | null; // Int
    name: string | null; // String
  }
  CategoryEntry: { // field return type
    amount: number | null; // Int
    expenses: Array<NexusGenRootTypes['Expense'] | null> | null; // [Expense]
    id: number | null; // Int
    name: string | null; // String
  }
  Entry: { // field return type
    categories: Array<NexusGenRootTypes['CategoryEntry'] | null> | null; // [CategoryEntry]
    id: number | null; // Int
    savings: Array<NexusGenRootTypes['SavingEntry'] | null> | null; // [SavingEntry]
  }
  Expense: { // field return type
    description: string | null; // String
    id: number | null; // Int
    updatedAt: string | null; // String
    value: number | null; // Int
  }
  Income: { // field return type
    id: number | null; // Int
    value: number | null; // Int
  }
  Mutation: { // field return type
    createBudget: NexusGenRootTypes['Budget']; // Budget!
    createCategory: NexusGenRootTypes['Category']; // Category!
    createCategoryBudget: NexusGenRootTypes['CategoryBudget']; // CategoryBudget!
    createCategoryEntry: NexusGenRootTypes['CategoryEntry']; // CategoryEntry!
    createEntry: NexusGenRootTypes['Entry']; // Entry!
    createExpense: NexusGenRootTypes['Expense']; // Expense!
    createIncome: NexusGenRootTypes['Income']; // Income!
    createSaving: NexusGenRootTypes['Saving']; // Saving!
    createSavingBudget: NexusGenRootTypes['SavingBudget']; // SavingBudget!
    deleteCategoryBudget: NexusGenRootTypes['CategoryBudget']; // CategoryBudget!
    deleteExpense: NexusGenRootTypes['Expense']; // Expense!
    deleteSaving: NexusGenRootTypes['Saving']; // Saving!
    deleteSavingBudget: NexusGenRootTypes['SavingBudget']; // SavingBudget!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    sendSaving: NexusGenRootTypes['Saving']; // Saving!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updateBudget: NexusGenRootTypes['Budget']; // Budget!
    updateCategory: NexusGenRootTypes['Category']; // Category!
    updateCategoryBudget: NexusGenRootTypes['CategoryBudget']; // CategoryBudget!
    updateCategoryEntry: NexusGenRootTypes['CategoryEntry']; // CategoryEntry!
    updateExpense: NexusGenRootTypes['Expense']; // Expense!
    updateSaving: NexusGenRootTypes['Saving']; // Saving!
    updateSavingBudget: NexusGenRootTypes['SavingBudget']; // SavingBudget!
  }
  Query: { // field return type
    budget: NexusGenRootTypes['Budget']; // Budget!
    budgets: NexusGenRootTypes['Budget'][] | null; // [Budget!]
    categories: NexusGenRootTypes['Category'][] | null; // [Category!]
    entry: NexusGenRootTypes['Entry']; // Entry!
    entryCategory: NexusGenRootTypes['CategoryEntry']; // CategoryEntry!
    savings: NexusGenRootTypes['Saving'][] | null; // [Saving!]
  }
  Saving: { // field return type
    goal: number | null; // Int
    id: number | null; // Int
    name: string | null; // String
    type: string | null; // String
    value: number | null; // Int
  }
  SavingBudget: { // field return type
    fee: number | null; // Int
    id: number | null; // Int
    name: string | null; // String
    type: string | null; // String
  }
  SavingEntry: { // field return type
    fee: number | null; // Int
    id: number | null; // Int
    name: string | null; // String
    sent: boolean | null; // Boolean
    type: string | null; // String
  }
  User: { // field return type
    currencyCode: string | null; // String
    email: string | null; // String
    id: number | null; // Int
    password: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Budget: { // field return type name
    categories: 'CategoryBudget'
    id: 'Int'
    name: 'String'
    savings: 'SavingBudget'
  }
  Category: { // field return type name
    id: 'Int'
    name: 'String'
  }
  CategoryBudget: { // field return type name
    amount: 'Int'
    id: 'Int'
    name: 'String'
  }
  CategoryEntry: { // field return type name
    amount: 'Int'
    expenses: 'Expense'
    id: 'Int'
    name: 'String'
  }
  Entry: { // field return type name
    categories: 'CategoryEntry'
    id: 'Int'
    savings: 'SavingEntry'
  }
  Expense: { // field return type name
    description: 'String'
    id: 'Int'
    updatedAt: 'String'
    value: 'Int'
  }
  Income: { // field return type name
    id: 'Int'
    value: 'Int'
  }
  Mutation: { // field return type name
    createBudget: 'Budget'
    createCategory: 'Category'
    createCategoryBudget: 'CategoryBudget'
    createCategoryEntry: 'CategoryEntry'
    createEntry: 'Entry'
    createExpense: 'Expense'
    createIncome: 'Income'
    createSaving: 'Saving'
    createSavingBudget: 'SavingBudget'
    deleteCategoryBudget: 'CategoryBudget'
    deleteExpense: 'Expense'
    deleteSaving: 'Saving'
    deleteSavingBudget: 'SavingBudget'
    login: 'AuthPayload'
    sendSaving: 'Saving'
    signup: 'AuthPayload'
    updateBudget: 'Budget'
    updateCategory: 'Category'
    updateCategoryBudget: 'CategoryBudget'
    updateCategoryEntry: 'CategoryEntry'
    updateExpense: 'Expense'
    updateSaving: 'Saving'
    updateSavingBudget: 'SavingBudget'
  }
  Query: { // field return type name
    budget: 'Budget'
    budgets: 'Budget'
    categories: 'Category'
    entry: 'Entry'
    entryCategory: 'CategoryEntry'
    savings: 'Saving'
  }
  Saving: { // field return type name
    goal: 'Int'
    id: 'Int'
    name: 'String'
    type: 'String'
    value: 'Int'
  }
  SavingBudget: { // field return type name
    fee: 'Int'
    id: 'Int'
    name: 'String'
    type: 'String'
  }
  SavingEntry: { // field return type name
    fee: 'Int'
    id: 'Int'
    name: 'String'
    sent: 'Boolean'
    type: 'String'
  }
  User: { // field return type name
    currencyCode: 'String'
    email: 'String'
    id: 'Int'
    password: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createBudget: { // args
      name: string; // String!
    }
    createCategory: { // args
      name: string; // String!
    }
    createCategoryBudget: { // args
      amount: number; // Int!
      budgetId: number; // Int!
      categoryId: number; // Int!
    }
    createCategoryEntry: { // args
      amount: number; // Int!
      categoryId: number; // Int!
      entryId: number; // Int!
    }
    createEntry: { // args
      budgetId: number; // Int!
      month: number; // Int!
      year: number; // Int!
    }
    createExpense: { // args
      categoryId: number; // Int!
      description: string; // String!
      entryId: number; // Int!
      value: number; // Int!
    }
    createIncome: { // args
      description: string; // String!
      entryId: number; // Int!
      value: number; // Int!
    }
    createSaving: { // args
      goal: number; // Int!
      name: string; // String!
      type?: string | null; // String
      value?: number | null; // Int
    }
    createSavingBudget: { // args
      budgetId: number; // Int!
      fee: number; // Int!
      savingId: number; // Int!
    }
    deleteCategoryBudget: { // args
      budgetId: number; // Int!
      categoryId: number; // Int!
    }
    deleteExpense: { // args
      id: number; // Int!
    }
    deleteSaving: { // args
      id: number; // Int!
    }
    deleteSavingBudget: { // args
      budgetId: number; // Int!
      savingId: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    sendSaving: { // args
      entryId: number; // Int!
      id: number; // Int!
      value: number; // Int!
    }
    signup: { // args
      email: string; // String!
      password: string; // String!
    }
    updateBudget: { // args
      id: number; // Int!
      name: string; // String!
    }
    updateCategory: { // args
      id: number; // Int!
      name: string; // String!
    }
    updateCategoryBudget: { // args
      amount: number; // Int!
      budgetId: number; // Int!
      categoryId: number; // Int!
    }
    updateCategoryEntry: { // args
      amount: number; // Int!
      categoryId: number; // Int!
      entryId: number; // Int!
    }
    updateExpense: { // args
      description: string; // String!
      id: number; // Int!
      value: number; // Int!
    }
    updateSaving: { // args
      goal: number; // Int!
      id: number; // Int!
      name: string; // String!
      value: number; // Int!
    }
    updateSavingBudget: { // args
      budgetId: number; // Int!
      fee: number; // Int!
      savingId: number; // Int!
    }
  }
  Query: {
    budget: { // args
      id: number; // Int!
    }
    entry: { // args
      month: number; // Int!
      year: number; // Int!
    }
    entryCategory: { // args
      categoryId: number; // Int!
      entryId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

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
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

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
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}