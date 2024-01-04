// App.js
import React, { useState } from 'react';
import ReimbursementList from './reimber';

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

  const [userRole, setUserRole] = useState('employee');
  const [showReimbursementForm, setShowReimbursementForm] = useState(false);

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

  const switchToUser = () => {
    setUserRole('employee');
    setShowReimbursementForm(true);
  };

  const switchToAdmin = () => {
    setUserRole('admin');
    setShowReimbursementForm(false); 
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your logic for handling form submission here
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="bg-white p-4 rounded shadow w-50">
        <h2 className="text-2xl font-semibold mb-4">
          {showReimbursementForm ? 'Reimbursement Form' : 'Login Form'}
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
        {userRole === 'admin' &&  (
            <div>
              <ReimbursementList />
            </div>
          )}
        <div className="mt-3">
          <p>Switch user role:</p>
          <button className="btn btn-secondary me-2" onClick={switchToUser}>
            User
          </button>
          <button className="btn btn-secondary" onClick={switchToAdmin}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
