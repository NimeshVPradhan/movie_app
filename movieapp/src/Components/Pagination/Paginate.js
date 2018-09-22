import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';

import './Paginate.css';


class Paginate extends Component {
  render(){
    return <div className='react-paginate'>
              <ReactPaginate previousLabel={"previous"}
                   nextLabel={"next"}
                   breakLabel={<a href="">...</a>}
                   breakClassName={"break-me"}
                   pageCount={this.props.pageCount}
                   marginPagesDisplayed={2}
                   pageRangeDisplayed={5}
                   onPageChange={this.props.onPageChange}
                   containerClassName={"pagination"}
                   subContainerClassName={"pages pagination"}
                   activeClassName={"active"} />
          </div>
  }
}

export default Paginate;
