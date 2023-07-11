import { GraphQLError } from "graphql";

interface HttpOptions {
  status: number;
}

interface ThrowErrorOptions {
  code: string;
  http?: HttpOptions;
}

export function throwError(message: string, options: ThrowErrorOptions) {
  var { code, http } = options;

  throw new GraphQLError(message, {
    extensions: {
      code,
      http,
    },
  });
}
