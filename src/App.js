import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    reimbursementAmount: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    reimbursementAmount: '',
  });

  const [userRole, setUserRole] = useState('employee'); // Default role is 'employee'
  const [showReimbursementForm, setShowReimbursementForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === '' ? `${name} is required.` : '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login request submitted:', formData);

    if (userRole === 'employee') {
      console.log('Submitting reimbursement form:', formData);
      // Add logic for handling reimbursement form submission
    } else {
      // Add logic for handling authentication and role-based redirection here
    }
  };

  const switchToUser = () => {
    setUserRole('employee');
    setShowReimbursementForm(true);
  };

  const switchToAdmin = () => {
    setUserRole('admin');
    setShowReimbursementForm(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="bg-white p-4 rounded shadow w-49">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {showReimbursementForm ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reimbursementAmount" className="form-label">
                Reimbursement Amount
              </label>
              <input
                type="text"
                id="reimbursementAmount"
                name="reimbursementAmount"
                value={formData.reimbursementAmount}
                onChange={handleInputChange}
                className={`form-control ${errors.reimbursementAmount ? 'is-invalid' : ''}`}
              />
              {errors.reimbursementAmount && (
                <div className="invalid-feedback">{errors.reimbursementAmount}</div>
              )}
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
