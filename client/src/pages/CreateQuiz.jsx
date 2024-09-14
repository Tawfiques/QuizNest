import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    startDate: null,
    endDate: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/api/quiz/create", form);
      if (response.data.success === false) {
        setError(response.data.message);
      }
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "startDate" || e.target.id === "endDate") {
      setForm({
        ...form,
        [e.target.id]: new Date(e.target.value),
      });
    } else {
      setForm({
        ...form,
        [e.target.id]: e.target.value,
      });
    }
  };
  return (
    <div className="animate-fade-in">
      <div className="p-4 sm:ml-64 h-[100vh-40px] pt-20 animate-fade-in">
        <div className="p-4 rounded-lg ">
          <div className="mx-auto max-w-lg shadow-lg rounded-xl py-5">
            <form
              className="flex flex-col gap-8 px-12 h-full my-4 rounded"
              onSubmit={handleSubmit}
            >
              <h1 className="text-center text-3xl font-bold text-[#5386e4] sm:text-5xl uppercase">
                Quiz Creation
              </h1>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    className="w-full rounded-lg items-start border-gray-200 px-5 py-5 text-sm text-black font-semibold shadow-sm hover:opacity-90 focus:outline-slate-900"
                    placeholder="QUIZ TITLE"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  label="Start Date"
                  id="startDate"
                  value={form.startDate}
                  onChange={(newValue) =>
                    setForm({
                      ...form,
                      startDate: newValue,
                    })
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  label="End Date"
                  id="endDate"
                  value={form.endDate}
                  onChange={(newValue) =>
                    setForm({
                      ...form,
                      endDate: newValue,
                    })
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ bgcolor: "#00AF54" }}
                >
                  SAVE
                </Button>
              </div>
              {error && <p className="text-center text-sm text-red-500 font-bold">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


