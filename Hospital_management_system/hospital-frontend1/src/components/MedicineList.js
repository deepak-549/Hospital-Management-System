import React, { useEffect, useState } from "react";
import api from "../services/api1";

function MedicineList() {

  const [medicines, setMedicines] = useState([]);

  const load = () => {
    api.get("/medicines").then(res => setMedicines(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const deleteMedicine = async (id) => {
    await api.delete(`/medicines/${id}`);
    load();
  };

  return (
    <table>
      <tbody>
        {medicines.map(m => (
          <tr key={m.id}>
            <td>{m.name}</td>
            <td>{m.company}</td>
            <td>{m.price}</td>
            <td>{m.quantity}</td>
            <td>
              <button onClick={() => deleteMedicine(m.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MedicineList;
