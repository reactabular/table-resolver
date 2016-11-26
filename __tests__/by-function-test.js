import { byFunction } from '../src';

describe('resolve.byFunction', function () {
  it('does not resolve without a resolver', function () {
    const name = 'demo';
    const property = 'name';
    const rowData = {
      name
    };
    const column = {
      property
    };

    expect(
      byFunction('cell.resolve')({ column })(rowData)
    ).toEqual({
      [property]: name
    });
  });

  it('resolves with a resolver', function () {
    const countries = { dk: 'Denmark' };
    const country = 'dk';
    const property = 'country';
    const rowData = {
      country
    };
    const column = {
      property,
      cell: {
        resolve: v => countries[v]
      }
    };

    expect(
      byFunction('cell.resolve')({ column })(rowData)
    ).toEqual({
      [property]: country,
      [`_${property}`]: countries.dk
    });
  });

  it('retains data attributes', function () {
    const data = 'demo';
    const countries = { dk: 'Denmark' };
    const country = 'dk';
    const property = 'country';
    const rowData = {
      country,
      data
    };
    const column = {
      property,
      cell: {
        resolve: v => countries[v]
      }
    };

    expect(
      byFunction('cell.resolve')({ column })(rowData)
    ).toEqual({
      data,
      [property]: country,
      [`_${property}`]: countries.dk
    });
  });
});
