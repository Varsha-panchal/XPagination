import React, { useState, useEffect } from 'react';

const Pagination = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch data from the provided API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setEmployeeData(data);

        // Calculate total pages based on 10 rows per page
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Calculate the range of employee data to display based on current page
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  const currentPageData = employeeData.slice(startIndex, endIndex);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

