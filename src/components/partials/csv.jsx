import React from 'react'
import { CSVLink } from 'react-csv'
import { Button } from '@material-ui/core';

export const ExportReactCSV = ({ data, headers, fileName }) => {
  return (
    <Button variant="contained"  >
      <CSVLink data={data} headers={headers} filename={fileName}>Export</CSVLink>
    </Button>
  )
}