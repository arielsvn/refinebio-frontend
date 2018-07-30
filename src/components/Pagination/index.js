import React, { Component } from 'react';
import { getRange } from '../../common/helpers';
import './Pagination.scss';
import Button from '../Button';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: ''
    };
  }

  handleJumpPageSubmit(e) {
    const { totalPages, onPaginate } = this.props;
    e.preventDefault();
    if (this.state.pageNumber && this.state.pageNumber <= totalPages) {
      onPaginate(this.state.pageNumber);
    }
  }

  handleInputChange(e) {
    const {
      target: { value }
    } = e;
    this.setState({ pageNumber: value });
  }

  getPaginationRange(currentPage, totalPages) {
    if (currentPage <= 2) {
      return [2, 3];
    } else if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  renderPages() {
    const { totalPages, onPaginate, currentPage } = this.props;

    const pageArray =
      totalPages < 5
        ? getRange(totalPages)
        : this.getPaginationRange(currentPage, totalPages);

    return (
      <span>
        {totalPages < 5 ? null : (
          <span>
            <button
              onClick={() => onPaginate(1)}
              className={`pagination__page ${
                currentPage === 1 ? 'pagination__page--active' : ''
              }`}
            >
              1
            </button>
            {currentPage > 3 && (
              <span className="pagination__ellipsis">...</span>
            )}
          </span>
        )}
        {pageArray.map((page, i) => {
          return (
            <button
              key={i}
              onClick={() => onPaginate(page)}
              className={`pagination__page ${
                currentPage === page ? 'pagination__page--active' : ''
              }`}
            >
              {page}
            </button>
          );
        })}
        {totalPages < 5 ? null : (
          <span>
            {currentPage < totalPages - 2 && (
              <span className="pagination__ellipsis">...</span>
            )}
            <button
              onClick={() => onPaginate(totalPages)}
              className={`pagination__page ${
                currentPage === totalPages ? 'pagination__page--active' : ''
              }`}
            >
              {totalPages}
            </button>
          </span>
        )}
      </span>
    );
  }

  render() {
    const { onPaginate, totalPages, currentPage } = this.props;

    if (totalPages <= 1) return null;
    return (
      <div className="pagination">
        <div>
          <button
            onClick={() => onPaginate(currentPage - 1)}
            disabled={currentPage <= 1}
            className="pagination__ends"
          >
            &lt; Previous
          </button>
          {this.renderPages()}
          <button
            onClick={() => onPaginate(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="pagination__ends"
          >
            Next &gt;
          </button>
        </div>
        <div className="pagination__jumper">
          <form onSubmit={this.handleJumpPageSubmit.bind(this)}>
            <label>
              Jump to page
              <input
                id="pageNumber"
                name="pageNumber"
                className="pagination__input"
                type="number"
                min="1"
                onChange={this.handleInputChange.bind(this)}
                value={this.state.pageNumber}
                style={{ marginRight: '8px' }}
              />
              <Button buttonStyle="transparent" text="Go" />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Pagination;
