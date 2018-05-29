const initialState = {
  dataSetId: null,
  dataSet: {},
  experiments: {},
  samples: {},
  isLoading: false,
  areDetailsFetched: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DOWNLOAD_DATASET_FETCH': {
      const { dataSetId } = action.data;
      return {
        ...state,
        dataSetId,
        isLoading: true
      };
    }
    case 'DOWNLOAD_DATASET_FETCH_SUCCESS': {
      const { dataSet } = action.data;
      return {
        ...state,
        dataSet,
        isLoading: false
      };
    }
    case 'DOWNLOAD_ADD_EXPERIMENT': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'DOWNLOAD_ADD_EXPERIMENT_SUCCESS': {
      const { dataSetId, dataSet } = action.data;
      return {
        ...state,
        dataSetId,
        dataSet,
        isLoading: false
      };
    }
    case 'DOWNLOAD_REMOVE_EXPERIMENT_SUCCESS': {
      const { dataSet } = action.data;
      return {
        ...state,
        dataSet
      };
    }
    case 'DOWNLOAD_REMOVE_SPECIES_SUCCESS': {
      const { dataSet } = action.data;
      return {
        ...state,
        dataSet
      };
    }
    case 'DOWNLOAD_FETCH_DETAILS': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'DOWNLOAD_FETCH_DETAILS_SUCCESS': {
      const { experiments, samples } = action.data;
      return {
        ...state,
        experiments,
        samples,
        isLoading: false,
        areDetailsFetched: true
      };
    }
    default:
      return state;
  }
};

export function groupSamplesBySpecies({ samples, dataSet }) {
  return Object.keys(dataSet).reduce((species, id) => {
    if (!Object.keys(samples).length) return species;
    const experiment = samples[id];
    if (!experiment || !experiment.length) return species;
    experiment.forEach(sample => {
      const { organism: { name: organismName } } = sample;
      species[organismName] = species[organismName] || [];
      species[organismName].push(sample);
    });
    return species;
  }, {});
}

export function getExperimentCountBySpecies({ experiments, dataSet }) {
  return Object.keys(dataSet).reduce((species, accessionCode) => {
    const experimentInfo = experiments[accessionCode];
    if (!experimentInfo) return {};
    const { organisms } = experimentInfo;
    organisms.forEach(organism => {
      if (!species[organism]) species[organism] = 0;
      species[organism]++;
    });
    return species;
  }, {});
}

export function getTotalSamplesAdded({ dataSet }) {
  return Object.keys(dataSet).reduce(
    (sum, accessionCode) => sum + dataSet[accessionCode].length,
    0
  );
}

export function getTotalExperimentsAdded({ dataSet }) {
  return Object.keys(dataSet).length;
}
