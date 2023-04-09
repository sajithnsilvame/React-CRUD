import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const CreateStudent = () => {
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setstudent] = useState({
    name: "",
    cource: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    e.persist();
    setstudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();

    const data = {
      name: student.name,
      cource: student.cource,
      email: student.email,
    };

    Axios.post(`http://localhost:8000/api/student`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/students");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 422) {
            console.log(err.response.data.errors);
          }
        }
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-4">
              <div className="card-header">
                <h1>
                  Register Students
                  <a href="students" className="btn btn-warning float-end">
                    Back to Home
                  </a>
                </h1>

                <div className="col-md-6 mt-4">
                  <form onSubmit={saveStudent}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        onChange={handleInput}
                        value={student.name}
                      />
                      {/* <span className="text-danger">{inputErrorList.name}</span> */}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Course"
                        name="cource"
                        onChange={handleInput}
                        value={student.cource}
                      />
                      {/* <span className="text-danger">
                        {inputErrorList.cource}
                      </span> */}
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={handleInput}
                        value={student.email}
                      />
                      {/* <span className="text-danger">
                        {inputErrorList.email}
                      </span> */}
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
