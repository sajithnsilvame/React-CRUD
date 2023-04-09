import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Axios from "axios";
const StudentList = () => {
  const [loading, setLoading] = useState(true);
  const [student, setStudents] = useState([]);

  // get data
  useEffect(() => {
    Axios.get(`http://localhost:8000/api/students`).then((res) => {
      //console.log(res);
      setStudents(res.data.student);
      setLoading(false);
    });
  }, []);

  //delete method
  const deleteStudent = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting..";
    Axios.delete(`http://localhost:8000/api/student/${id}/delete`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.log(err.response.data.errors);
            thisClicked.innerText = "Delete";
          }
        }
      });
  };

  // var studentDetails = student && student.length > 0 && student?.map((item, index) => {
  //   return (
  //     <tr key={index}>
  //       <td>{item.id}</td>
  //       <td>{item.name}</td>
  //       <td>{item.cource}</td>
  //       <td>{item.email}</td>
  //       <td>
  //         <a className="btn btn-success">Edit</a>
  //       </td>
  //       <td>
  //         <button className="btn btn-danger">Detele</button>
  //       </td>
  //     </tr>
  //   );
  // });

  // if (loading) {
  //   return (
  //     <div className="spinner-border text-primary" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-4">
              <div className="card-header">
                <h1>
                  Student List
                  <a
                    href="create-student"
                    className="btn btn-primary float-end">
                    Add Student
                  </a>
                </h1>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Cource</th>
                      <th scope="col">Email</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student &&
                      student.length > 0 &&
                      student?.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.cource}</td>
                            <td>{item.email}</td>
                            <td>
                              <a
                                href={`/student/${item.id}/edit`}
                                className="btn btn-success">
                                Edit
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={(e) => deleteStudent(e, item.id)}
                                className="btn btn-danger">
                                Detele
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
