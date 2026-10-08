
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // =========================
  // GET ALL TEACHERS
  // =========================
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:8000/api/teachers"
      );

      setTeachers(res.data);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to load teachers."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE TEACHER
  // =========================
  const handleDelete = async (id) => {
    const teacher = teachers.find(
      (teacher) => teacher._id === id
    );

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${teacher?.name}?`
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);

      await axios.delete(
        `http://localhost:8000/api/delete/teacher/${id}`
      );

      setTeachers((prevTeachers) =>
        prevTeachers.filter(
          (teacher) => teacher._id !== id
        )
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete teacher."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================
  // EDIT TEACHER
  // =========================
  const handleEdit = (id) => {
    navigate(`/add-teacher/${id}`);
  };

  // =========================
  // SEARCH
  // =========================
  const filteredTeachers = teachers.filter((teacher) => {
    const searchText = search.toLowerCase();

    return (
      teacher.name?.toLowerCase().includes(searchText) ||
      teacher.email?.toLowerCase().includes(searchText) ||
      teacher.phone?.toLowerCase().includes(searchText) ||
      teacher.address?.toLowerCase().includes(searchText) ||
      teacher.course?.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading teachers...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            Something went wrong
          </h2>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <button
            onClick={fetchTeachers}
            className="mt-6 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <p className="text-sm font-medium text-blue-600">
              Teacher Management
            </p>

            <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-gray-900">
              Teachers
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all registered teachers from one place.
            </p>
          </div>

          <Link
            to="/add-teacher"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-xl">+</span>
            Add Teacher
          </Link>

        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        {/* TOTAL */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Teachers
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                {teachers.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
              👨‍🏫
            </div>

          </div>
        </div>

        {/* SHOWING */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Showing
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                {filteredTeachers.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
              🔎
            </div>

          </div>
        </div>

        {/* COURSES */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Courses
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                {
                  new Set(
                    teachers
                      .map((teacher) => teacher.course)
                      .filter(Boolean)
                  ).size
                }
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 text-xl">
              📚
            </div>

          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* TABLE HEADER */}
        <div className="p-5 sm:p-6 border-b border-gray-100">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                All Teachers
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View, edit or remove teacher information.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-80">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search teachers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

          </div>

        </div>

        {/* RESPONSIVE TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>
              <tr className="bg-gradient-to-r from-[#0B3D91] via-[#3F3B96] to-[#B7193F] text-white">

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  #
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Address
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Course
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredTeachers.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                        👨‍🏫
                      </div>

                      <h3 className="mt-4 font-semibold text-gray-800">
                        No teachers found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {search
                          ? "Try searching with a different name or email."
                          : "Add your first teacher to get started."}
                      </p>

                    </div>

                  </td>
                </tr>

              ) : (

                filteredTeachers.map((teacher, index) => (

                  <tr
                    key={teacher._id}
                    className="border-b border-gray-100 last:border-none hover:bg-blue-50/40 transition-colors"
                  >

                    {/* NUMBER */}
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    {/* TEACHER */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold uppercase">
                          {teacher.name?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {teacher.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Teacher
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {teacher.email}
                    </td>

                    {/* PHONE */}
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {teacher.phone}
                    </td>

                    {/* ADDRESS */}
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {teacher.address}
                    </td>

                    {/* COURSE */}
                    <td className="px-6 py-5">

                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                        {teacher.course || "Not assigned"}
                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-2">

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            handleEdit(teacher._id)
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200"
                        >
                          ✏️
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(teacher._id)
                          }
                          disabled={
                            deleteLoading === teacher._id
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >

                          {deleteLoading === teacher._id ? (
                            <>
                              <span className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></span>
                              Deleting...
                            </>
                          ) : (
                            <>
                              🗑️
                              Delete
                            </>
                          )}

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ShowTeacher;

