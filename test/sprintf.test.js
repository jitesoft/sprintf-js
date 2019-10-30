import sprintf from '../src/index';

describe('Tests for sprintf.', () => {
  describe('Tests for variable substitution.', () => {
    describe('Integer types', () => {
      test('Int', () => {
        expect(sprintf('Abc %i EFG', 5)).toEqual('Abc 5 EFG');
        expect(sprintf('Abc %i %i %i %i EFG', 5, 9, 12, 100)).toEqual('Abc 5 9 12 100 EFG');
        expect(sprintf('Abc %i %i EFG', 5)).toEqual('Abc 5 %i EFG');
        expect(sprintf('Abc %i %i %i EFG', 5, 'abc', 10)).toEqual('Abc 5 NaN 10 EFG');
      });

      test('Int - Hex', () => {
        expect(sprintf('Abc %x EFG', 5)).toEqual('Abc 5 EFG');
        expect(sprintf('Abc %x %x %x %x EFG', 5, 9, 12, 100)).toEqual('Abc 5 9 c 64 EFG');
        expect(sprintf('Abc %x %x EFG', 5)).toEqual('Abc 5 %x EFG');
        expect(sprintf('Abc %x %x %x EFG', 5, 'abc', 10)).toEqual('Abc 5 NaN a EFG');
      });

      test('Int - Hex (upper case)', () => {
        expect(sprintf('Abc %X EFG', 5)).toEqual('Abc 5 EFG');
        expect(sprintf('Abc %X %X %X %X EFG', 5, 9, 12, 100)).toEqual('Abc 5 9 C 64 EFG');
        expect(sprintf('Abc %X %X EFG', 5)).toEqual('Abc 5 %X EFG');
        expect(sprintf('Abc %X %X %X EFG', 5, 'abc', 10)).toEqual('Abc 5 NaN A EFG');
      });

      test('Int - Octal', () => {
        expect(sprintf('Abc %o EFG', 5)).toEqual('Abc 5 EFG');
        expect(sprintf('Abc %o %o %o %o EFG', 5, 9, 12, 100)).toEqual('Abc 5 11 14 144 EFG');
        expect(sprintf('Abc %o %o EFG', 5)).toEqual('Abc 5 %o EFG');
        expect(sprintf('Abc %o %o %o EFG', 5, 'abc', 10)).toEqual('Abc 5 NaN 12 EFG');
      });

      test('Int - Scientific Notation', () => {
        expect(sprintf('Abc %e EFG', 5)).toEqual('Abc 5e+0 EFG');
        expect(sprintf('Abc %e %e %e %e EFG', 5, 9, 12, 10000000000)).toEqual('Abc 5e+0 9e+0 1.2e+1 1e+10 EFG');
        expect(sprintf('Abc %e %e EFG', 5123123123123123123)).toEqual('Abc 5.123123123123123e+18 %e EFG');
        expect(sprintf('Abc %e %e %e EFG', 5, 'abc', 10)).toEqual('Abc 5e+0 NaN 1e+1 EFG');
      });

      test('Int - Scientific Notation (upper case)', () => {
        expect(sprintf('Abc %E EFG', 5)).toEqual('Abc 5E+0 EFG');
        expect(sprintf('Abc %E %E %E %E EFG', 5, 9, 12, 10000000000)).toEqual('Abc 5E+0 9E+0 1.2E+1 1E+10 EFG');
        expect(sprintf('Abc %E %E EFG', 5123123123123123123)).toEqual('Abc 5.123123123123123E+18 %E EFG');
        expect(sprintf('Abc %E %E %E EFG', 5, 'abc', 10)).toEqual('Abc 5E+0 NaN 1E+1 EFG');
      });
    });

    describe('Float types', () => {
      test('Double', () => {
        expect(sprintf('Abc %d EFG', 5.123)).toEqual('Abc 5.123 EFG');
        expect(sprintf('Abc %d %d %d %d EFG', 5, 9.123, 12, 1000000.00001)).toEqual('Abc 5 9.123 12 1000000.00001 EFG');
        expect(sprintf('Abc %d %d EFG', 512312.123)).toEqual('Abc 512312.123 %d EFG');
        expect(sprintf('Abc %d %d %d EFG', 5.22, 'abc', 10.123)).toEqual('Abc 5.22 NaN 10.123 EFG');
      });

      test('Float', () => {
        expect(sprintf('Abc %f EFG', 5.123)).toEqual('Abc 5.123 EFG');
        expect(sprintf('Abc %f %f %f %f EFG', 5, 9.123, 12, 1000000.00001)).toEqual('Abc 5 9.123 12 1000000.00001 EFG');
        expect(sprintf('Abc %f %f EFG', 512312.123)).toEqual('Abc 512312.123 %f EFG');
        expect(sprintf('Abc %f %f %f EFG', 5.22, 'abc', 10.123)).toEqual('Abc 5.22 NaN 10.123 EFG');
      });

      test('Float - Hex', () => {
        expect(sprintf('Abc %a EFG', 5.123)).toEqual('Abc 5.1f7ced916872c EFG');
        expect(sprintf('Abc %a %a %a %a EFG', 5, 9.123, 12, 1000000.00001)).toEqual('Abc 5 9.1f7ced9168728 c f4240.0000a7c58 EFG');
        expect(sprintf('Abc %a %a EFG', 512312.123)).toEqual('Abc 7d138.1f7ced918 %a EFG');
        expect(sprintf('Abc %a %a %a EFG', 5.22, 'abc', 10.123)).toEqual('Abc 5.3851eb851eb84 NaN a.1f7ced9168728 EFG');
      });

      test('Float - Hex (upper case)', () => {
        expect(sprintf('Abc %A EFG', 5.123)).toEqual('Abc 5.1F7CED916872C EFG');
        expect(sprintf('Abc %A %A %A %A EFG', 5, 9.123, 12, 1000000.00001)).toEqual('Abc 5 9.1F7CED9168728 C F4240.0000A7C58 EFG');
        expect(sprintf('Abc %A %A EFG', 512312.123)).toEqual('Abc 7D138.1F7CED918 %A EFG');
        expect(sprintf('Abc %A %A %A EFG', 5.22, 'abc', 10.123)).toEqual('Abc 5.3851EB851EB84 NaN A.1F7CED9168728 EFG');
      });

      describe('Precision tests.', () => {
        describe('Double/Float', () => {
          test('No precision rounding if no .num', () => {
            expect(sprintf('ABC %d EFG', 1.23)).toEqual('ABC 1.23 EFG');
            expect(sprintf('ABC %f EFG', 1.23)).toEqual('ABC 1.23 EFG');
          });

          test('Precision rounding with .4', () => {
            expect(sprintf('ABC %d.4 EFG', 1.2345678)).toEqual('ABC 1.2345 EFG');
            expect(sprintf('ABC %d.4 EFG', 1.23)).toEqual('ABC 1.2300 EFG');
            expect(sprintf('ABC %f.4 EFG', 1.2345678)).toEqual('ABC 1.2345 EFG');
            expect(sprintf('ABC %f.4 EFG', 1.23)).toEqual('ABC 1.2300 EFG');
          });

          test('Precision rounding with .1', () => {
            expect(sprintf('ABC %d.1 EFG', 1)).toEqual('ABC 1.0 EFG');
            expect(sprintf('ABC %d.1 EFG', 1.23)).toEqual('ABC 1.2 EFG');
            expect(sprintf('ABC %f.1 EFG', 1)).toEqual('ABC 1.0 EFG');
            expect(sprintf('ABC %f.1 EFG', 1.23)).toEqual('ABC 1.2 EFG');
          });

          test('Precision rounding with .50', () => {
            expect(sprintf('%d.50', 1.23)).toEqual('1.23' + [].fill(0, 0, 48).join(''));
            expect(sprintf('%d.50', 1)).toEqual('1.' + [].fill(0, 0, 50).join(''));
            expect(sprintf('%f.50', 1.23)).toEqual('1.23' + [].fill(0, 0, 48).join(''));
            expect(sprintf('%f.50', 1)).toEqual('1.' + [].fill(0, 0, 50).join(''));
          });

          test('Precision rounding with .e', () => {
            expect(sprintf('abc %d.e', 123)).toEqual('abc 123.', [].fill(0, 0, 16).join(''));
            expect(sprintf('abc %d.e', 123.123123123123123123123123123)).toEqual('abc 123.1231231231231231');
            expect(sprintf('abc %d.e', 123.123123)).toEqual('abc 123.1231230000000000');
            expect(sprintf('abc %f.e', 123)).toEqual('abc 123.', [].fill(0, 0, 16).join(''));
            expect(sprintf('abc %f.e', 123.123123123123123123123123123)).toEqual('abc 123.1231231231231231');
            expect(sprintf('abc %f.e', 123.123123)).toEqual('abc 123.1231230000000000');
          });

          test('Precision rounding with .s', () => {
            expect(sprintf('abc %d.s', 123)).toEqual('abc 123.s');
            expect(sprintf('abc %d.s', 123)).toEqual('abc 123.s');
            expect(sprintf('abc %f.s', 123)).toEqual('abc 123.s');
            expect(sprintf('abc %f.s', 123)).toEqual('abc 123.s');
          });
        });

        describe('Double/Float - Hex', () => {
          test('No precision rounding if no .num', () => {});

          test('Precision rounding with .4', () => {});

          test('Precision rounding with .1', () => {});

          test('Precision rounding with .50', () => {});

          test('Precision rounding with .e', () => {});

          test('Precision rounding with .s', () => {});
        });
      });
    });

    describe('String types', () => {
      test('String', () => {
        expect(sprintf('Abc %s EFG', 'weeeee')).toEqual('Abc weeeee EFG');
        expect(sprintf('Abc %s %s %s %s EFG', 'weeeee', 'Hi!', 'cool', 'nice')).toEqual('Abc weeeee Hi! cool nice EFG');
        expect(sprintf('Abc %s %s EFG', 'testtest')).toEqual('Abc testtest %s EFG');
        expect(sprintf('Abc %s %s %s EFG', 'something', 'abc', 'yay')).toEqual('Abc something abc yay EFG');
      });

      test('Char', () => {
        expect(sprintf('Abc %c EFG', 'A')).toEqual('Abc A EFG');
        expect(sprintf('Abc %c %c %c %c EFG', 5, '9', 'T', 'g')).toEqual('Abc 5 9 T g EFG');
        expect(sprintf('Abc %c %c EFG', '5')).toEqual('Abc 5 %c EFG');
        expect(sprintf('Abc %c %c %c EFG', '5', 'abc', '')).toEqual('Abc 5 a [NULL] EFG');
      });

      test('Json', () => {
        expect(sprintf('Abc %j EFG', {test: 'A'})).toEqual('Abc {"test":"A"} EFG');
        expect(sprintf('Abc %j %j %j %j EFG', 5, {
          val: '9',
          arr: ['a', 'b'],
          obj: {t: 1}
        })).toEqual('Abc 5 {"val":"9","arr":["a","b"],"obj":{"t":1}} %j %j EFG');
        expect(sprintf('Abc %j %j EFG', '5')).toEqual('Abc "5" %j EFG');
        expect(sprintf('Abc %j %j %j %j EFG', {}, {a: 'b'}, ['a', 45], [])).toEqual('Abc {} {"a":"b"} ["a",45] [] EFG');
      });

      test('Percent.', () => {
        expect(sprintf('ABC %% %% %%')).toEqual('ABC % % %');
      });
    });
  });
});
