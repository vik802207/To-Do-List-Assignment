import React from 'react';
import "./Filter.css"
const Filter = ({ value, onChange }) => (
  <div className="filter-container">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="filter-select"
    >
      <option className="filter-option" value="all">All Tasks</option>
      <option className="filter-option" value="completed">Completed</option>
      <option className="filter-option" value="pending">Pending</option>
    </select>
  </div>
);

export default Filter;
