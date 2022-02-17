import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  {
    title: "title",
    label: "title",
    options: {
      filter:false,
      sort: true,
    },
  },
  {
    title: "author",
    label: "author",
    options: {
     filter:false,
      sort: true,
    },
  },
  {
    title: "ISBN",
    label: "ISBN",
    options: {
     filter:false,
      sort: true,
    },
  },
  {
    title: "DateLent",
    label: "Date Lent",
    options: {
     filter:false,
      sort: true,
    },
  },
  {
    title: "ExpectedReturn",
    label: "Expected Return",
    options: {
     filter:false,
      sort: true,
    },
  },
  {
    title: "DateReturned",
    label: "Date Returned",
    options: {
      filter:false,
      sort: true,
    },
  },
];

const options = {
  filterType: 'checkbox',
  serverSide: true
};

function Returns(props){
  const [returns, setReturns] = useState([])
  useEffect(() => {
    const getReturns = async () =>{
      await fetch('/bookReturns').then(res => {
        setReturns(res.data)
      })
    }
    getReturns()
  },[])
  return(
<div>
  <MUIDataTable
  title={props.title}
  data={returns}
  columns={columns}
  options={options}
  />
</div>
  )
}



export default Returns;
