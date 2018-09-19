import React, { Component}  from 'react';
import ReactPaginate from 'react-paginate';
import './m.css';


export const SelectMenu = props => {
    return   <select className='custom-select' onChange={props.onChange}>
          <option value='popular' >Most popular</option>
          <option value='now_playing' >Now playing</option>
          <option value='top_rated' >Top rated</option>
          <option value='upcoming' >Upcoming</option>
      </select>
    }


export const Paginate = props => {
  return <div className='react-paginate'>
            <ReactPaginate previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageCount={props.pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={props.onPageChange}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"} />
        </div>
}
