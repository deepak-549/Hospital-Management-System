import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import DoctorRegister from "./components/DoctorRegister";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import Patient from "./components/Patient";
import Doctor from "./components/Doctor";
import Appointment from "./components/Appointment";
import Room from "./components/Room";

import AddPatient from "./components/AddPatient";
import AddDoctor from "./components/AddDoctor";
import AddAppointment from "./components/AddAppointment";
import AddRoom from "./components/AddRoom";
import AddBed from "./components/AddBed";
import AssignBed from "./components/AssignBed";
import AddBill from "./components/AddBill";

import PatientList from "./components/PatientList";
import DoctorList from "./components/DoctorList";
import EditPatient from "./components/EditPatient";
import EditDoctor from "./components/EditDoctor";
import AppointmentList from "./components/AppointmentList";
import RoomBedList from "./components/RoomBedList";
import BedDashboard from "./components/BedDashboard";
import Prescriptions from "./components/Prescriptions";
import Bill from "./components/AddBill";
import AddMedicine from "./components/AddMedicine";
import Payment from "./components/Payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />

        <Route path="/doctor-dashboard/*" element={<DoctorDashboard />} />

        {/* ADMIN AREA */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/room" element={<Room />} />
          <Route path="/add-medicine" element={<AddMedicine />} />

          {/* EXTRA PAGES */}
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/add-bed" element={<AddBed />} />
          <Route path="/assign-bed" element={<AssignBed />} />
          <Route path="/add-bill" element={<AddBill />} />

          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          <Route path="/appointment-list" element={<AppointmentList />} />
          <Route path="/room-bed-list" element={<RoomBedList />} />
          <Route path="/bed-dashboard" element={<BedDashboard />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/bill" element={<Bill />}></Route>

          <Route path="/edit-patient/:id" element={<EditPatient />} />
          <Route path="/edit-doctor/:id" element={<EditDoctor />} />
          <Route path="/payment" element={<Payment />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
