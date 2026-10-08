
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaBookOpen,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      setStudents(res.data);
    } catch (error) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const totalStudents = students.length;

  const courses = [
    ...new Set(
      students.map((student) => student.course).filter(Boolean)
    ),
  ];

  const totalCourses = courses.length;

  const studentsWithCourse = students.filter(
    (student) => student.course
  ).length;

  const courseCount = students.reduce((result, student) => {
    if (student.course) {
      result[student.course] =
        (result[student.course] || 0) + 1;
    }

    return result;
  }, {});

  const recentStudents = [...students].reverse().slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-blue-700 text-white p-6 rounded-lg">
          <p className="text-sm">Student Management System</p>
          <h1 className="text-3xl font-bold">lets learrn</h1>
          <p>Manage your students and courses easily.</p>
        </div>

        <div className="my-8">
          <p className="text-blue-600 font-semibold">Dashboard</p>
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back! 👋
          </h2>
          <p className="text-gray-500">
            Here's what's happening with your school today.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white p-6 rounded-lg shadow">
            <FaUserGraduate className="text-blue-600 text-3xl" />

            <p className="mt-4 text-gray-500">
              Total Students
            </p>

            <h3 className="text-3xl font-bold">
              {loading ? "..." : totalStudents}
            </h3>

            <p className="text-gray-400">
              Students registered
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <FaBookOpen className="text-purple-600 text-3xl" />

            <p className="mt-4 text-gray-500">
              Total Courses
            </p>

            <h3 className="text-3xl font-bold">
              {loading ? "..." : totalCourses}
            </h3>

            <p className="text-gray-400">
              Courses with students
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <FaUsers className="text-green-600 text-3xl" />

            <p className="mt-4 text-gray-500">
              Students With Course
            </p>

            <h3 className="text-3xl font-bold">
              {loading ? "..." : studentsWithCourse}
            </h3>

            <p className="text-gray-400">
              Course assignments
            </p>
          </div>

        </div>

        <div className="bg-white rounded-lg shadow mt-8">

          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <FaChartLine className="text-blue-600" />

              <div>
                <h2 className="text-2xl font-bold">
                  Students by Course
                </h2>

                <p className="text-gray-400">
                  Course enrollment overview
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <p className="p-6">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="p-6 text-gray-500">
              No course data available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

              {courses.map((course) => {
                const count = courseCount[course];

                const percentage =
                  totalStudents > 0
                    ? Math.round(
                        (count / totalStudents) * 100
                      )
                    : 0;

                return (
                  <div
                    key={course}
                    className="border p-4 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-bold">
                        {course}
                      </h3>

                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {count}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span>Enrollment</span>
                        <span>{percentage}%</span>
                      </div>

                      <div className="h-2 bg-gray-200 rounded mt-2">
                        <div
                          className="h-2 bg-blue-600 rounded"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>

        <div className="bg-white rounded-lg shadow mt-8">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">
              Recent Students
            </h2>

            <p className="text-gray-400">
              Recently registered students
            </p>
          </div>

          {loading ? (
            <p className="p-6">Loading...</p>
          ) : recentStudents.length === 0 ? (
            <p className="p-6 text-gray-500">
              No students found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left">#</th>
                    <th className="p-4 text-left">Student</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Course</th>
                  </tr>
                </thead>

                <tbody>
                  {recentStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-b"
                    >
                      <td className="p-4">
                        {index + 1}
                      </td>

                      <td className="p-4 font-semibold">
                        {student.name}
                      </td>

                      <td className="p-4">
                        {student.email}
                      </td>

                      <td className="p-4">
                        {student.course || "Not assigned"}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;