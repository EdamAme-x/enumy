const sharedLabel = "@__enumy__" as const;

const EnumyNumber = class extends Number {
    [sharedLabel]: symbol;

    constructor(value: number, symbol: symbol) {
        super(value);
        this[sharedLabel] = symbol;
    }
}

export const enumy = function enumy<Labels extends string[]>(...lagels: Labels): Record<Labels[number], number> {
    const internalSymbol = Symbol(
        sharedLabel
    );

    return lagels.reduce((record, label, i) => {
        // deno-lint-ignore ban-ts-comment
        // @ts-expect-error
        record[label] = new EnumyNumber(i, internalSymbol);
        return record;
    }, {} as Record<string, number>);
}
