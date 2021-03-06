import DataSetStats, { DataSetOperations } from './DataSetStats';

describe('DataSetStats', () => {
  it('getAddedSlice', () => {
    const dataset = { e1: ['s1', 's2'] };
    const slice = { e1: ['s1'] };
    const addedSlice = new DataSetStats(dataset, slice).getAddedSlice();
    expect(addedSlice).toEqual({ e1: ['s1'] });
  });

  describe('getSamplesInDataSet', () => {
    it('returns samples in dataset', () => {
      const dataset = { e1: ['s1', 's2'] };
      const slice = { e1: ['s1'] };
      const processedSamples = new DataSetStats(
        dataset,
        slice
      ).getSamplesInDataSet();
      expect(processedSamples).toEqual(['s1']);
    });

    it('returns unique values', () => {
      const dataset = { e1: ['s1', 's2'], e2: ['s1'] };
      const slice = { e1: ['s1'], e2: ['s1'] };
      const processedSamples = new DataSetStats(
        dataset,
        slice
      ).getSamplesInDataSet();
      expect(processedSamples).toEqual(['s1']);
    });
  });

  describe('all samples in dataset', () => {
    it('not all samples are present', () => {
      const dataset = { e1: ['s1'] };
      const slice = { e1: ['s1', 's2'] };
      const allProcessedInDataSet = new DataSetStats(
        dataset,
        slice
      ).allProcessedInDataSet();
      expect(allProcessedInDataSet).toBeFalsy();
    });
  });
});

describe('DataSetOperations', () => {
  it('intersect with one common value', () => {
    const d1 = { e1: ['s1'], e2: ['s2'] };
    const d2 = { e1: ['s1', 's2'] };
    expect(DataSetOperations.intersect(d1, d2)).toEqual({ e1: ['s1'] });
  });

  it('intersect with all accessions from experiment', () => {
    const d1 = { e1: ['s1'], e2: ['s2'] };
    const d2 = { e1: { all: true, total: 10 } };
    expect(DataSetOperations.intersect(d1, d2)).toEqual({ e1: ['s1'] });
    expect(DataSetOperations.intersect(d2, d1)).toEqual({ e1: ['s1'] });
  });

  it('isEqual to empty dataset', () => {
    const d1 = {};
    const d2 = { e1: ['s1', 's2'] };
    expect(DataSetOperations.equal(d1, d2)).toBeFalsy();
  });

  it('isEqual ignores order where items appear', () => {
    const d1 = { e1: ['s2', 's1'], e2: ['s3'] };
    const d2 = { e2: ['s3'], e1: ['s1', 's2'] };
    expect(DataSetOperations.equal(d1, d2)).toBeTruthy();
  });

  it('equal comparing all codes with the same total', () => {
    const d1 = { e1: ['s1', 's2'] };
    const d2 = { e1: { all: true, total: 2 } }; // more accession codes than the ones in d1
    expect(DataSetOperations.equal(d1, d2)).toBeTruthy();
  });

  it('equal comparing all experiment accession codes mismatch', () => {
    const d1 = { e1: ['s1'] };
    const d2 = { e1: { all: true, total: 2 } }; // more accession codes than the ones in d1
    expect(DataSetOperations.equal(d1, d2)).toBeFalsy();
  });
});
