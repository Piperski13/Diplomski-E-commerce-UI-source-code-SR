import { formatCurrency } from "../../scripts/utils/money.js";

describe('case suite: formatCurrency',()=>{
  it('converts cents into dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('tests edge case, zero cents',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('tests edge case, round up cents',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
  it('tests edge case, round down cents',()=>{
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});