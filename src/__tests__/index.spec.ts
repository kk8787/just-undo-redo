import { StateHistory } from '../index';

interface Test {
  a1: number;
  a2: string;
}

describe('index', () => {
  it('dose undo-redo work', () => {
    const his = new StateHistory<Test>({ max: 4, defaultData: { a1: 2, a2: 'ff' } });
    his.save({ a1: 3, a2: 'ss' });
    expect(his.len()).toBe(2);

    const res1 = his.undo();
    expect(res1).toEqual({ a1: 2, a2: 'ff' });

    const res2 = his.undo();
    expect(res2).toBeNull();
    expect(his.index).toBe(0);

    const res3 = his.undo();
    expect(res3).toBeNull();

    const res4 = his.redo();
    expect(res4).toEqual({ a1: 3, a2: 'ss' });

    const res5 = his.redo();
    expect(res5).toBeNull();
  });

  it('do not pass the defaultVal, max', () => {
    const his = new StateHistory<Test>({ max: 2 });
    his.save({ a1: 2, a2: 'ff' });
    his.save({ a1: 3, a2: 'ss' });
    his.save({ a1: 4, a2: 'qq' });
    expect(his.len()).toBe(2);

    const res1 = his.undo();
    expect(res1).toEqual({ a1: 4, a2: 'qq' });

    const res2 = his.undo();
    expect(res2).toEqual({ a1: 3, a2: 'ss' });

    const res3 = his.undo();
    expect(res3).toBeNull();
  });

  it('remove backward elements when saving', () => {
    const his = new StateHistory<Test>({ max: 50 });
    his.save({ a1: 2, a2: 'ff' });
    his.save({ a1: 3, a2: 'ss' });
    his.undo();
    his.undo();
    his.save({ a1: 4, a2: 'qq' });

    const res1 = his.redo();
    expect(res1).toBeNull();
    console.log(his.history);
    expect(his.len()).toBe(1);
  });
});
