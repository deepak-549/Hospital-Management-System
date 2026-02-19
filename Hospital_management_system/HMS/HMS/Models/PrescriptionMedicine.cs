using System.ComponentModel.DataAnnotations;

namespace HMS.Models
{
    public class PrescriptionMedicine
    {
        [Key]
        public int Id { get; set; }

        public int PrescriptionId { get; set; }
        public Prescription? Prescription { get; set; }   // navigation (optional)

        public int MedicineId { get; set; }
        public Medicine? Medicine { get; set; }           // navigation (optional)

        public string Dosage { get; set; } = "";
        public int Days { get; set; }
        public string Instructions { get; set; } = "";
    }
}
