
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    Teacher: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Only courses allowed by backend
  const courses = ["BCA", "BSc CSIT", "BIT", "BBA"];

  // Teachers allowed by backend
  const teachers = [
    "Rajesh Sharma",
    "Suman Adhikari",
    "Prakash Thapa",
    "Anita Karki",
    "Bikash Shrestha",
    "Nisha Gurung",
    "kshitiz shrestha",
    "shissir shressstha",
  ];

  // Get existing student when editing
  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        setFetching(true);

        const res = await axios.get(
          `http://localhost:8000/api/user/${id}`
        );

        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          course: res.data.course || "",
          Teacher: res.data.Teacher || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load student."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");

      if (isEditMode) {
        await axios.put(
          `http://localhost:8000/api/update/user/${id}`,
          formData
        );

        setMessage("Student updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8000/api/user",
          formData
        );

        setMessage("Student added successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          course: "",
          Teacher: "",
        });
      }

      setTimeout(() => {
        navigate("/show-student");
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errorMessage ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl font-semibold text-gray-700">
          Loading student...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg"
      >
        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          {isEditMode ? "Edit Student" : "Add Student"}
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          {isEditMode
            ? "Update the student's information."
            : "Fill out the form below to add a new student."}
        </p>

        {/* Success */}
        {message && (
          <div className="mb-5 rounded-lg bg-green-100 px-4 py-3 text-green-700">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9800000000"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Address */}
        <div className="mb-5">
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Address
          </label>

          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Kathmandu, Nepal"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Course */}
        <div className="mb-6">
          <label
            htmlFor="course"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Course
          </label>

          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select Course</option>

            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Teacher */}
        <div className="mb-6">
          <label
            htmlFor="Teacher"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Teacher
          </label>

          <select
            id="Teacher"
            name="Teacher"
            value={formData.Teacher}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select Teacher</option>

            {teachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/show-student")}
            className="w-1/2 rounded-lg bg-gray-500 px-4 py-3 font-semibold text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update Student"
              : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
