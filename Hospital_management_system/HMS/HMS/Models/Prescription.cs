using System.ComponentModel.DataAnnotations;

namespace HMS.Models
{
    public class Prescription
    {
        public Prescription()
        {
            PrescriptionMedicines = new List<PrescriptionMedicine>();
        }

        [Key]
        public int Id { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public DateTime PrescriptionDate { get; set; }
        public ICollection<PrescriptionMedicine> PrescriptionMedicines { get; set; }
    }
}

