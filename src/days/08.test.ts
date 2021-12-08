import { addTable, deduceA, deduceBD, deduceCF, deduceEG, initState, parseLine, splitBD, splitCF, translate } from "./08";

test('deduction', () => {
    //ab -> cf
    //1: c -> ab, f -> ab
    //7: dab -> acf; dab - ab = d => a = d
    //4: eafb - ab = ef => b -> ef, d -> ef
    //6: cefabd | cagedb | cdfgeb = 6 || 9 || 0; 0 does not have both e|f, so 0 => cagebd, d -> f, b -> e
    //   cefabd | cdfgeb = 6 || 9; 6 does not have both ab, so 6 = cdfgeb, c -> a, f -> b
    const line = parseLine('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab|cdfeb fcadb cdfeb cdbaf');

    const first = deduceCF(initState(line));
    expect(first).toHaveProperty('cf', 'ab');

    const second = deduceA(first);
    expect(second).toHaveProperty('a', 'd');

    const third = deduceBD(second);
    expect(third).toHaveProperty('bd', 'ef');

    const fourth = splitBD(third);
    expect(fourth).toHaveProperty('b', 'e')
    expect(fourth).toHaveProperty('d', 'f');

    const fifth = splitCF(fourth);
    expect(fifth).toHaveProperty('c', 'a')
    expect(fifth).toHaveProperty('f', 'b');

    const final = deduceEG(fifth);
    expect(final).toHaveProperty('e', 'g');
    expect(final).toHaveProperty('g', 'c');

    const translationTable = new Map<string, string>([
      ["a", "c"],
      ["b", "f"],
      ["c", "g"],
      ["d", "a"],
      ["e", "b"],
      ["f", "d"],
      ["g", "e"],
    ]);
    const withTable = addTable(final);
    expect(withTable).toHaveProperty('table', translationTable);

    expect(
      line.inputs.map((digit) => translate(withTable, digit))
    ).toStrictEqual([8, 5, 2, 3, 7, 9, 6, 4, 0, 1]);

      
});