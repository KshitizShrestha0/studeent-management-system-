
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/users");
      setStudents(res.data);
    } catch (error) {
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const student = students.find((student) => student._id === id);

    if (!window.confirm(`Delete ${student?.name}?`)) return;

    try {
      setDeleteLoading(id);

      await axios.delete(`http://localhost:8000/api/delete/user/${id}`);

      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      alert("Failed to delete student");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/add-student/${id}`);
  };

  const filteredStudents = students.filter((student) => {
    const text = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(text) ||
      student.email?.toLowerCase().includes(text) ||
      student.phone?.toLowerCase().includes(text) ||
      student.address?.toLowerCase().includes(text) ||
      student.course?.toLowerCase().includes(text) ||
      student.Teacher?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Student List</h1>
            <p className="text-gray-500">Manage all students</p>
          </div>

          <button
            onClick={() => navigate("/add-student")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Student
          </button>
        </div>

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg"
        />

        {error && (
          <p className="bg-red-100 text-red-600 p-3 mb-4 rounded">
            {error}
          </p>
        )}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">

            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Teacher</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center">
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <tr key={student._id} className="border-b">

                    <td className="p-4">{index + 1}</td>

                    <td className="p-4 font-semibold">
                      {student.name}
                    </td>

                    <td className="p-4">{student.email}</td>

                    <td className="p-4">{student.phone}</td>

                    <td className="p-4">{student.address}</td>

                    <td className="p-4">
                      {student.Teacher || "Not assigned"}
                    </td>

                    <td className="p-4">
                      {student.course || "Not assigned"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(student._id)}
                        className="bg-blue-500 text-white px-3 py-2 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        disabled={deleteLoading === student._id}
                        className="bg-red-500 text-white px-3 py-2 rounded"
                      >
                        {deleteLoading === student._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        <p className="mt-3 text-gray-500">
          Showing {filteredStudents.length} of {students.length} students
        </p>

      </div>
    </div>
  );
};

export default ShowStudent;