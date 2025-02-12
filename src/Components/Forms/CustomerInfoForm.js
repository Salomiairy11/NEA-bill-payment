import React, { useState } from 'react';
import './Form.css';

const CustomerInfoForm = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    scNo: '',
    fullName: '',
    address: '',
    phoneNo: '',
    email: '',
    branchId: '',
    demandTypeId: '',
    dob: '',
    status: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //const [result, setResult] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    /*const form = $(e.target);
    $.ajax({
      type: 'POST',
      url: form.attr("action"),
      data: form.serialize(),
      success(data){
        setResult(data);
      },
  });*/
  };

  return (
    <div className="form-container">
      <h2>Customer Info</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
};

export default CustomerInfoForm;
