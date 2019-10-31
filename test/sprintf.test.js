import sprintf from '../src/index';

describe('Tests for sprintf.', () => {
  describe('Tests for variable substitution.', () => {
    describe('Integer types', () => {
      describe('Precision / pad tests.', () => {
        test('Len more than p does nothing.', () => {
          expect(sprintf('Hej %.5d på dej!', 1234567)).toEqual('Hej 1234567 på dej!');
          expect(sprintf('Hej %.1d på dej!', 123)).toEqual('Hej 123 på dej!');
        });

        test('Len less left-pads 0s.', () => {
          expect(sprintf('Hej %.5i på dej!', 123)).toEqual('Hej 00123 på dej!');
          expect(sprintf('Hej %.10i på dej!', 12345)).toEqual('Hej 0000012345 på dej!');
          expect(sprintf('Hej %.5d på dej!', 123)).toEqual('Hej 00123 på dej!');
          expect(sprintf('Hej %.10d på dej!', 12345)).toEqual('Hej 0000012345 på dej!');
        });
      });

      test('Int', () => {
        expect(sprintf('Abc %i EFG', 5)).toEqual('Abc 5 EFG');
        expect(sprintf('Abc %i %i %i %i EFG', 5, 9, 12, 100)).toEqual('Abc 5 9 12 100 EFG');
        expect(sprintf('Abc %i %i EFG', 5)).toEqual('Abc 5 %i EFG');
        expect(sprintf('Abc %i %i %i EFG', 5, 'abc', 10)).toEqual('Abc 5 NaN 10 EFG');
      });

      test('Int - as %d', () => {
        expect(sprintf('Abc %d EFG', 5)).toEqual('Abc 5 EFG');
        expect(sprintf('Abc %d %d %d %d EFG', 5, 9, 12, 100)).toEqual('Abc 5 9 12 100 EFG');
        expect(sprintf('Abc %d %d EFG', 5)).toEqual('Abc 5 %d EFG');
        expect(sprintf('Abc %d %d %d EFG', 5, 'abc', 10)).toEqual('Abc 5 NaN 10 EFG');
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
            expect(sprintf('ABC %f EFG', 1.23)).toEqual('ABC 1.23 EFG');
          });

          test('Precision rounding with .4', () => {
            expect(sprintf('ABC %.4f EFG', 1.2345678)).toEqual('ABC 1.2345 EFG');
            expect(sprintf('ABC %.4f EFG', 1.23)).toEqual('ABC 1.2300 EFG');
          });

          test('Precision rounding with .1', () => {
            expect(sprintf('ABC %.1f EFG', 1)).toEqual('ABC 1.0 EFG');
            expect(sprintf('ABC %.1f EFG', 1.23)).toEqual('ABC 1.2 EFG');
          });

          test('Precision rounding with .50', () => {
            expect(sprintf('%.50f', 1.23)).toEqual('1.23' + '0'.repeat(48));
            expect(sprintf('%.50f', 1)).toEqual('1.' + '0'.repeat(50));
          });

          test('Precision rounding with .s', () => {
            expect(sprintf('abc %.sf', 123)).toEqual('abc .sf');
            expect(sprintf('abc %.sf', 123)).toEqual('abc .sf');
          });
        });

        describe('Double/Float - Hex', () => {
          describe('Double/Float', () => {
            test('No precision rounding if no .num', () => {
              expect(sprintf('ABC %A EFG', 1.23)).toEqual('ABC 1.3AE147AE147AE EFG');
              expect(sprintf('ABC %a EFG', 1.23)).toEqual('ABC 1.3ae147ae147ae EFG');
            });

            test('Precision rounding with .4', () => {
              expect(sprintf('ABC %.4A EFG', 1.2345678)).toEqual('ABC 1.3C0C EFG');
              expect(sprintf('ABC %.4A EFG', 1.23)).toEqual('ABC 1.3AE1 EFG');
              expect(sprintf('ABC %.4a EFG', 1.2345678)).toEqual('ABC 1.3c0c EFG');
              expect(sprintf('ABC %.4a EFG', 1.23)).toEqual('ABC 1.3ae1 EFG');
            });

            test('Precision rounding with .1', () => {
              expect(sprintf('ABC %.1A EFG', 1)).toEqual('ABC 1.0 EFG');
              expect(sprintf('ABC %.1A EFG', 1.23)).toEqual('ABC 1.3 EFG');
              expect(sprintf('ABC %.1a EFG', 1)).toEqual('ABC 1.0 EFG');
              expect(sprintf('ABC %.1a EFG', 1.23)).toEqual('ABC 1.3 EFG');
            });

            test('Precision rounding with .50', () => {
              expect(sprintf('%.50A', 1.23)).toEqual('1.3AE147AE147AE0000000000000000000000000000000000000');
              expect(sprintf('%.50A', 1)).toEqual('1.' + '0'.repeat(50));
              expect(sprintf('%.50a', 1.23)).toEqual('1.3ae147ae147ae0000000000000000000000000000000000000');
              expect(sprintf('%.50a', 1)).toEqual('1.' + '0'.repeat(50));
            });

            test('Precision rounding with .s', () => {
              expect(sprintf('abc %.sA', 123)).toEqual('abc .sA');
              expect(sprintf('abc %.sA', 123)).toEqual('abc .sA');
              expect(sprintf('abc %.sa', 123)).toEqual('abc .sa');
              expect(sprintf('abc %.sa', 123)).toEqual('abc .sa');
            });
          });
        });

      });
    });

    describe('String types', () => {
      describe('Precision/substring tests.', () => {
        describe('String.', () => {
          test('Precision cuts after n characters.', () => {
            expect(sprintf('abc %.5s efg', '123456abc')).toEqual('abc 12345 efg');
            expect(sprintf('abc %.5s efg', 'Hej san')).toEqual('abc Hej s efg');
          });

          test('Precision does NOT add if short.', () => {
            expect(sprintf('abc %.5s efg', 'hej')).toEqual('abc hej efg');
            expect(sprintf('abc %.5s efg', 'h s')).toEqual('abc h s efg');
          });
        });
      });

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
        expect(sprintf('Abc %j EFG', { test: 'A' })).toEqual('Abc {"test":"A"} EFG');
        expect(sprintf('Abc %j %j %j %j EFG', 5, {
          val: '9',
          arr: ['a', 'b'],
          obj: { t: 1 }
        })).toEqual('Abc 5 {"val":"9","arr":["a","b"],"obj":{"t":1}} %j %j EFG');
        expect(sprintf('Abc %j %j EFG', '5')).toEqual('Abc "5" %j EFG');
        expect(sprintf('Abc %j %j %j %j EFG', {}, { a: 'b' }, ['a', 45], [])).toEqual('Abc {} {"a":"b"} ["a",45] [] EFG');
      });

      test('Percent.', () => {
        expect(sprintf('ABC %% %% %%')).toEqual('ABC % % %');
      });
    });
  });
});
