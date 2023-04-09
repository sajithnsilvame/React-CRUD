import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const EditStudent = () => {
  const [student, setstudent] = useState({});

  let { id } = useParams();

  // get relevant edit data
  useEffect(() => {
    Axios.get(`http://localhost:8000/api/student/${id}/edit`)
      .then((res) => {
        //console.log(res);
        setstudent(res.data.student);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            alert(err.response.data.errors);
          }
          if (err.response.status === 500) {
            alert(err.response.data.errors);
          }
        }
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setstudent({ ...student, [e.target.name]: e.target.value });
  };

  // update method
  const updateStudent = (e) => {
    e.preventDefault();

    const data = {
      name: student.name,
      cource: student.cource,
      email: student.email,
    };

    Axios.put(`http://localhost:8000/api/student/${id}/update`, data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 422) {
            console.log(err.response.data.errors);
          }
          if (err.response.status === 404) {
            alert(err.response.data.errors);
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
                  Update Student info
                  <a href="/students" className="btn btn-warning float-end">
                    Back to Home
                  </a>
                </h1>

                <div className="col-md-6 mt-4">
                  <form onSubmit={updateStudent}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        onChange={handleInput}
                        value={student.name}
                      />
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
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary">
                        Update
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

export default EditStudent;
