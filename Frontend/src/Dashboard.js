import React, { useEffect, useState } from 'react';
import { fetchShifts, createShift, fetchEmployees } from './api';

export default function Dashboard({ token, user, onLogout }) {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    setError(null);
    const res = await fetchShifts(token);
    if (res.shifts) setShifts(res.shifts);
    else setError(res.error || 'Failed to load');
  };

  const loadEmployees = async () => {
    const res = await fetchEmployees(token);
    if (res.employees) setEmployees(res.employees);
  };

  useEffect(() => { load(); if (user.role === 'admin') loadEmployees(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const payload = {
      employeeId: form.employeeId.value,
      date: form.date.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value
    };
    const res = await createShift(token, payload);
    if (res.shift) {
      load();
      form.reset();
    } else {
      setError(res.error || 'Failed to create');
    }
  }

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h2>Shift Board</h2>
        <div>
          <b>{user.email}</b> ({user.role}) <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      {user.role === 'admin' && (
        <div style={{marginTop:20, padding:10, border:'1px solid #ddd'}}>
          <h3>Create Shift (Admin)</h3>
          <form onSubmit={handleCreate}>
            <select name="employeeId" required>
              <option value="">Select employee</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.employeeCode})</option>)}
            </select>
            <input name="date" type="date" required />
            <input name="startTime" type="time" required />
            <input name="endTime" type="time" required />
            <button>Create</button>
          </form>
        </div>
      )}

      <div style={{marginTop:20}}>
        <h3>Shifts</h3>
        {error && <p style={{color:'red'}}>{error}</p>}
        <table border="1" cellPadding="8">
          <thead>
            <tr><th>Date</th><th>Employee</th><th>Start</th><th>End</th></tr>
          </thead>
          <tbody>
            {shifts.map(s => (
              <tr key={s.id}>
                <td>{s.date}</td>
                <td>{s.Employee?.name || s.employeeId}</td>
                <td>{s.startTime}</td>
                <td>{s.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
