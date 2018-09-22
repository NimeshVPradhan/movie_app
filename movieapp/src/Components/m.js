import React from 'react';
import './m.css';


export const SelectMenu = props => {
    return   <select className='custom-select' onChange={props.onChange}>
          <option value='popular' >Most popular</option>
          <option value='now_playing' >Now playing</option>
          <option value='top_rated' >Top rated</option>
          <option value='upcoming' >Upcoming</option>
      </select>
    }
