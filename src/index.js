import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

function App() {
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [projectType, setProjectType] = useState('');
  const [errors, setErrors] = useState({});

  const handleprojectTypeChange = (event) => {
    setProjectType(event.target.value);
  };

  const handleNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleKeyChange = (event) => {
    setProjectKey(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = { projectName: projectName, projectKey: projectKey, projectType: projectType };
    const errors = validation(values);
    if (Object.keys(errors).length === 0) {
      fetch('http://localhost:8080/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setProjectName('');
          setProjectKey('');
          setProjectType('');
        })
        .catch(error => console.error(error));
    } else {
      setErrors(errors);
    }
  };

  const validation = (values) => {
    let errors = {};
    if (!values.projectName) {
      errors.projectName = 'Name is required';
    } else if (values.projectName.length < 3) {
      errors.projectName = 'Name must be at least 3 characters long';
    }
    if (!values.projectType) {
      errors.projectType = 'Project type is required';
    }
    if (!values.projectKey) {
      errors.projectKey = 'Project key is required';
    }
    return errors;
  };

  return (
    <div className='container border'>
      <div className='row'>
        <div className='col-md-6'>
          <h4><b>Add Project Details</b></h4>
          <p>You can change these details any time in your project settings</p>
          <p><b>Project Name*</b></p>
          <form className='form-inline my-2 my-lg-0'>
            <input
              className='form-control mr-sm-2 img-thumbnail'
              placeholder='Enter a Project name'
              value={projectName}
              onChange={handleNameChange}
              required
            />
          </form>
          <br />
          <p><b>Project Types</b></p>
          <form className='form-inline my-2 my-lg-0'>
            <select className='form-control mr-sm-2 img-thumbnail' value={projectType} onChange={handleprojectTypeChange} required>
              <option value=''>Select a project type</option>
              <option value='Web Development'>Web Development</option>
              <option value='Mobile Development'>Mobile Development</option>
              <option value='Game Development'>Game Development</option>
            </select>
          </form>
          <br />
          <p><b>Project Key*</b></p>
          <form className='form-inline'>
            <input
              className='form-control mr-sm-1 img-thumbnail input'
              value={projectKey}
              onChange={handleKeyChange}
              required
              tabIndex='2'
            />
          </form>
          <br />
          <div>
            <input type='checkbox' id='share' name='share' />
            <label htmlFor='share'>Share settings with existing project</label>
</div>
<br />
<button className='btn btn-primary' onClick={handleSubmit}>Create Project</button>
{Object.keys(errors).length !== 0 && (
<div className='alert alert-danger mt-2'>
{Object.values(errors).map((error, index) => (
<div key={index}>{error}</div>


))}
</div>
)}


</div>

<div className='col-md-6'>
          <div className='img'>
            <input
              type='image'
              src='https://thegrowthhustlers.com/wp-content/uploads/2021/12/growth-marketing-strategy.gif'
              alt='Submit'
              width='430'
              height='200'
            />
          </div>
    </div>

</div>
</div>
);
}

ReactDOM.render(<App />, document.getElementById('root'));
