import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import data from './data/mock-data.json';


let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
    
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
        </thead>
        
          {currentTableData.map(item => {
            return (
                            
                <p>{item.id}</p>
                <p>{item.first_name}</p>
                <p>{item.last_name}</p>
                <p>{item.email}</p>
                <p>{item.phone}</p>
           
            );
          })}
       
     
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
