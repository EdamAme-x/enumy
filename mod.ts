/**
 * @module
 * Enhanced enum for TypeScript
 */
const sharedLabel = "@__enumy__" as const;

const EnumyNumber = class extends Number {
  [sharedLabel]: symbol;

  constructor(value: number, symbol: symbol) {
    super(value);
    this[sharedLabel] = symbol;
  }
};

type JoinLabels<Labels extends string[]> = Labels[number] extends
  `${infer A}${infer B}` ? `${A}${JoinLabels<[B, ...Labels]>}` : Labels[number];

/**

     *
     * Each property of the returned object is a unique number, and the value is
     * not equal to any other number or enum value unless explicitly coerced.
     *
     * The returned object is a frozen Record<string, number>.
     *
     * @example https://jsr.io/@evex/enumy
     *
     * @param {...string} labels - `("KEY1", "KEY2", "KEY3")`
     *
     * @returns {Record<string, number>} - `enum.KEY`
     **/
export const enumy = function enumy<
  Labels extends string[],
>(
  ...lagels: Labels
):
  & Record<
    Labels[number],
    number
  >
  & {
    brand: <BrandName extends string>(_brandName: BrandName) => Record<
      Labels[number],
      & number
      & {
        [K in `${typeof sharedLabel}${BrandName}`]: never;
      }
    >;
  } {
  const internalSymbol = Symbol(
    sharedLabel,
  );

  const keys = lagels.reduce((record, label, i) => {
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    record[label] = new EnumyNumber(i, internalSymbol);
    return record;
  }, {} as Record<string, number>);

  Object.defineProperties(keys, {
    "brand": {
      value: (_brandName: string) => keys,
    },
  });

  Object.freeze(keys);

  // deno-lint-ignore no-explicit-any
  return keys as any;
};
