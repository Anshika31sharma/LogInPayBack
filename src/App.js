import React, { useState } from 'react';

const reimbursementData = [
  { date: '2022-01-01', amount: '$100', paymentType: 'Credit', outOfPocketExpense: ['meal'], raisedBy: 'Employee1', remarks: 'Lorem ipsum' },
  { date: '2022-01-02', amount: '$150', paymentType: 'Cash', outOfPocketExpense: ['meal', 'other'], raisedBy: 'Employee2', remarks: 'Dolor sit amet' },
  { date: '2022-01-03', amount: '$50', paymentType: 'Credit', outOfPocketExpense: ['meal'], raisedBy: 'Employee3', remarks: 'Lorem ipsum' },
  { date: '2022-01-04', amount: '$200', paymentType: 'Debit', outOfPocketExpense: ['meal', 'other'], raisedBy: 'Employee4', remarks: 'Dolor sit amet' },
 
];
const SignUpForm = ({ handleSignUp, handleInputChange }) => {
  return (
    <div className="table-responsive">
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

const App = () => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    paymentType: '',
    outOfPocketExpense: [],
    materialTransportation: '',
    other: '',
    raisedBy: '',
    remarks: '',
  });

  const [signUpData, setSignUpData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    date: '',
    amount: '',
    paymentType: '',
    outOfPocketExpense: '',
    materialTransportation: '',
    other: '',
    raisedBy: '',
    remarks: '',
  });

  
  const [showReimbursementForm, setShowReimbursementForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [reimbursements, setReimbursements] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedOutOfPocketExpense = checked
        ? [...formData.outOfPocketExpense, name]
        : formData.outOfPocketExpense.filter((item) => item !== name);

      setFormData({
        ...formData,
        outOfPocketExpense: updatedOutOfPocketExpense,
        [name]: checked ? 'selected' : '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: value.trim() === '' ? `${name} is required.` : '',
    });
  };

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const switchToUser = () => {
    setShowReimbursementForm(true);
    setShowSignUpForm(false);
  };


  const switchToSignUp = () => {
    setShowReimbursementForm(false);
    setShowSignUpForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReimbursements([...reimbursements, formData]);
    setFormData({
      date: '',
      amount: '',
      paymentType: '',
      outOfPocketExpense: [],
      materialTransportation: '',
      other: '',
      raisedBy: '',
      remarks: '',
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add logic for handling sign-up data
   
    // Clear the form after submission
    setSignUpData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="bg-white p-4 rounded shadow w-75">
        <h2 className="text-2xl font-semibold mb-4">
          {showReimbursementForm ? 'Reimbursement Form' : showSignUpForm ? 'Reimbursement List' : 'Login Form'}
        </h2>
        {showReimbursementForm ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
              />
              {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
              />
              {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="paymentType" className="form-label">
                Payment Type
              </label>
              <select
                id="paymentType"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleInputChange}
                className={`form-control ${errors.paymentType ? 'is-invalid' : ''}`}
              >
                <option value="">Select Payment Type</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              {errors.paymentType && <div className="invalid-feedback">{errors.paymentType}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Out of Pocket Expense</label>
              <div>
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    name="meal"
                    checked={formData.outOfPocketExpense.includes('meal')}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  Meal
                </label>
                {/* Add more checkboxes for other out of pocket expenses */}
                {/* ... (similar checkboxes for other out of pocket expenses) */}
              </div>
            </div>

            {/* Conditional text field for Material Transportation */}
            {formData.outOfPocketExpense.includes('materialTransportation') && (
              <div className="mb-3">
                <label htmlFor="materialTransportation" className="form-label">
                  Material Transportation
                </label>
                <input
                  type="text"
                  id="materialTransportation"
                  name="materialTransportation"
                  value={formData.materialTransportation}
                  onChange={handleInputChange}
                  className={`form-control ${errors.materialTransportation ? 'is-invalid' : ''}`}
                />
                {errors.materialTransportation && (
                  <div className="invalid-feedback">{errors.materialTransportation}</div>
                )}
              </div>
            )}

            {/* Conditional text field for Other with reason */}
            {formData.outOfPocketExpense.includes('other') && (
              <div className="mb-3">
                <label htmlFor="other" className="form-label">
                  Other
                </label>
                <input
                  type="text"
                  id="other"
                  name="other"
                  value={formData.other}
                  onChange={handleInputChange}
                  className={`form-control ${errors.other ? 'is-invalid' : ''}`}
                />
                {errors.other && <div className="invalid-feedback">{errors.other}</div>}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="raisedBy" className="form-label">
                Raised By
              </label>
              <select
                id="raisedBy"
                name="raisedBy"
                value={formData.raisedBy}
                onChange={handleInputChange}
                className={`form-control ${errors.raisedBy ? 'is-invalid' : ''}`}
              >
                <option value="">Select Employee</option>
                {/* Add options dynamically based on employee names */}
                {/* ... (options for employee names) */}
              </select>
              {errors.raisedBy && <div className="invalid-feedback">{errors.raisedBy}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="remarks" className="form-label">
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className={`form-control ${errors.remarks ? 'is-invalid' : ''}`}
              />
              {errors.remarks && <div className="invalid-feedback">{errors.remarks}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Reimbursement
            </button>
          </form>
        ) : showSignUpForm ? (
          <SignUpForm handleSignUp={handleSignUp} handleInputChange={handleSignUpInputChange} />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Log in
            </button>
          </form>
        )}
        
      
        
        <div className="mt-3">
          <p>Switch role:</p>
          <button className="btn btn-secondary me-2" onClick={switchToUser}>
            Employee
          </button>
          
          <button className="btn btn-secondary" onClick={switchToSignUp}>
           Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
