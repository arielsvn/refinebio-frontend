import React from 'react';
import { Link } from 'react-router-dom';
import AccessionIcon from '../../../common/icons/accession.svg';
import OrganismIcon from '../../../common/icons/organism.svg';
import SampleIcon from '../../../common/icons/sample.svg';
import './Result.scss';
import { formatSentenceCase, getMetadataFields } from '../../../common/helpers';
import DataSetSampleActions from '../../Experiment/DataSetSampleActions';
import DataSetStats from '../../Experiment/DataSetStats';
import SampleFieldMetadata from '../../Experiment/SampleFieldMetadata';
import Technology from '../../Experiment/Technology';
import * as routes from '../../../routes';
import HighlightedText from '../../../components/HighlightedText';
import TechnologyBadge, {
  MICROARRAY,
  RNA_SEQ
} from '../../../components/TechnologyBadge';

const Result = ({ result, query }) => {
  const metadataFields = getMetadataFields(result);

  return (
    <div className="result">
      <div className="result__title-container">
        <div className="result__title-info">
          <div className="result__accession">
            <img
              src={AccessionIcon}
              className="result__icon"
              alt="accession-icon"
            />{' '}
            {result.accession_code}
          </div>
          <Link
            className="link result__title"
            to={routes.experiments(result.accession_code, {
              ref: 'search',
              result
            })}
          >
            {result.title ? (
              <HighlightedText text={result.title} highlight={query} />
            ) : (
              'No title.'
            )}
          </Link>
        </div>

        <DataSetSampleActions
          dataSetSlice={{
            [result.accession_code]: result.processed_samples
          }}
        />
      </div>
      <ul className="result__stats">
        <li className="result__stat">
          <img
            src={OrganismIcon}
            className="result__icon"
            alt="organism-icon"
          />{' '}
          {result.organisms
            .map(organism => formatSentenceCase(organism))
            .join(', ') || 'No species.'}
        </li>
        <li className="result__stat">
          <img src={SampleIcon} className="result__icon" alt="sample-icon" />{' '}
          {result.total_samples_count} Sample{result.total_samples_count > 1 &&
            's'}
        </li>
        <li className="result__stat">
          <TechnologyBadge
            className="result__icon"
            isMicroarray={
              result.technologies && result.technologies.includes(MICROARRAY)
            }
            isRnaSeq={
              result.technologies && result.technologies.includes(RNA_SEQ)
            }
          />
          {result.pretty_platforms.filter(platform => !!platform).join(', ')}
        </li>
      </ul>

      <div className="result__details">
        <h3>Description</h3>
        <p className="result__paragraph">
          <HighlightedText text={result.description} highlight={query} />
        </p>
        <h3>Publication Title</h3>
        <p className="result__paragraph">
          {result.publication_title ? (
            <HighlightedText
              text={result.publication_title}
              highlight={query}
            />
          ) : (
            <i className="result__not-provided">No associated publication</i>
          )}
        </p>
        <h3>Sample Metadata Fields</h3>
        <p className="result__paragraph">
          {metadataFields && metadataFields.length ? (
            <HighlightedText
              text={metadataFields.join(', ')}
              highlight={query}
            />
          ) : (
            <i className="result__not-provided">No sample metadata fields</i>
          )}
        </p>

        <Link
          className="button button--secondary"
          to={routes.experimentsSamples(result.accession_code, {
            ref: 'search',
            result
          })}
        >
          View Samples
        </Link>
      </div>
    </div>
  );
};

export default Result;
