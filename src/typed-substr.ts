import { StringLength, StringTail } from '@properly-typed/utils';

export type Substr<
  BASE extends string,
  FROM extends number,
  LEN extends number | undefined = undefined,
  RES extends string = '',
> = string extends BASE
  ? string
  : FROM extends 0
    ? LEN extends undefined
      ? BASE
      : BASE extends ''
        ? RES
        : StringLength<RES> extends LEN
          ? RES
          : BASE extends `${infer FIRST_CHAR}${infer REST}`
            ? Substr<StringTail<REST, 0>, 0, LEN, `${RES}${FIRST_CHAR}`>
            : RES
    : Substr<StringTail<BASE, FROM>, 0, LEN, RES>;

export type TypedSubstr = {
  <
    STR extends string,
    FROM extends number,
    LEN extends number | undefined = undefined,
  >(
    baseString: STR,
    from: FROM,
    length?: LEN,
  ): Substr<STR, FROM, LEN>;
  (baseString: string, from: number, length?: number): string;
};

/**
 * Typed version of `String.prototype.substr`
 * Gets a substring beginning at the specified location and having the specified length.
 * @param baseString string to slice from
 * @param from The starting position of the desired substring. The index of the first character in the string is zero.
 * @param length The number of characters to include in the returned substring.
 * @example
 * // type is exact '456', not general string
 * const substr1: '456' = typedSubstr('0123456789', 4);
 * // type is exact '234', not general string
 * const substr2: '234' = typedSubstr('0123456789', 2, 3);
 */
export const typedSubstr: TypedSubstr = (
  baseString: string,
  from: number,
  length?: number,
// eslint-disable-next-line unicorn/prefer-string-slice
) => baseString.substr(from, length);
