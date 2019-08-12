/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { Link } from 'react-navi';

const RequestsFilterOrganism: FunctionComponent = () => {
  return (
    <div>
      <h1>Requests Filter goes here</h1>
      <Link href="/requests/abcd">link to a new place</Link>
    </div>
  );
};

export default RequestsFilterOrganism;
