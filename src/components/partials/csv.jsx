import React from 'react'
import { CSVLink } from 'react-csv'
import { Button } from '@material-ui/core';

export const ExportReactCSV = ({ csvData, fileName }) => {
  return (
    <Button variant="contained"  >
      <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
    </Button>
  )
}