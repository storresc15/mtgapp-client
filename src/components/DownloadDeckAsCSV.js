import React from 'react';
import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';

const DownloadDeckAsCSV = (props) => {
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Type', key: 'type' },
    { label: 'Id', key: 'multiverseid' },
    { label: 'Count', key: 'count' },
    { label: 'Colors', key: 'colors' }
  ];
  const { data } = props;
  const { fileName } = props;

  const csvReport = {
    data: data,
    headers: headers,
    filename: `${fileName}.csv`
  };
  return (
    <div>
      <Button
        size="large"
        variant="contained"
        color="primary"
        component="label"
      >
        <CSVLink {...csvReport} className="downloadButton">
          Export to CSV
        </CSVLink>
      </Button>
    </div>
  );
};

export default DownloadDeckAsCSV;
