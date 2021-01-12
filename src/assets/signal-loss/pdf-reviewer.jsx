import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Button } from "@material-ui/core";

export default function MyApp(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    props.showConsents();
  }

  return (
    <div id="pdf" >
      <Document
        // file="https://picspie.s3.ca-central-1.amazonaws.com/hearing+test/icf.pdf"
        file={process.env.PUBLIC_URL + "/docs/icf.pdf"}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page width={window.innerWidth} pageNumber={pageNumber} />
      </Document>


      <div style={{ textAlign: "center" }}>
        {
          pageNumber > 1 ?
            <Button variant="contained" onClick={() => { setPageNumber(pageNumber - 1) }} >Previous</Button>
            :
            null
        }
        <p>Page {pageNumber} of {numPages}</p>
        {pageNumber < numPages ?
          <Button variant="contained" onClick={handleNext} >Next</Button>
          :
          null
        }
      </div>
    </div>
  );
}