/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import RequestsFilterOrganism from './Requests';

const FilterOrganism: FunctionComponent<{ filter: string }> = ({ filter }) => {
  switch (filter) {
    case 'requests':
      return <RequestsFilterOrganism />;
    default:
      return <div>No filter found for {filter}</div>;
  }
};

export default FilterOrganism;
