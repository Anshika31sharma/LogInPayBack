// ReimbursementList.js
import React from 'react';

const ReimbursementList = () => {
  // Dummy data for demonstration purposes
  const reimbursementData = [
    { date: '2022-01-01', amount: '$100', paymentType: 'Credit', outOfPocketExpense: ['meal'], raisedBy: 'Employee1', remarks: 'Lorem ipsum' },
    { date: '2022-01-02', amount: '$150', paymentType: 'Cash', outOfPocketExpense: ['meal', 'other'], raisedBy: 'Employee2', remarks: 'Dolor sit amet' },
    // Add more dummy data as needed
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reimbursement List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment Type</th>
            <th>Out of Pocket Expense</th>
            <th>Raised By</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {reimbursementData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.paymentType}</td>
              <td>{item.outOfPocketExpense.join(', ')}</td>
              <td>{item.raisedBy}</td>
              <td>{item.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReimbursementList;
