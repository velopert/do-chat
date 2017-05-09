import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({size, color}) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-ring"><rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect><circle cx="50" cy="50" r="40" strokeDasharray="163.36281798666926 87.9645943005142" stroke={color} fill="none" strokeWidth="20"><animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" begin="0s"></animateTransform></circle></svg>
);

Spinner.propType = {
    size: PropTypes.string,
    color: PropTypes.string
};

Spinner.defaultProps = {
    size: '2rem',
    color: 'white'
};

export default Spinner;