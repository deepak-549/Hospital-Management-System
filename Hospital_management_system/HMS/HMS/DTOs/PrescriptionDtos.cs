namespace HMS.DTOs
{
    public class PrescriptionDtos
    {
        public class PrescriptionItemDto
        {
            public int MedicineId { get; set; }
            public string Dosage { get; set; } = "";
            public int Days { get; set; }
            public string Instructions { get; set; } = "";
        }



        public class PrescriptionCreateUpdateDto
        {
            public int DoctorId { get; set; }
            public int PatientId { get; set; }
            public DateTime? PrescriptionDate { get; set; }
            public List<PrescriptionItemDto> Items { get; set; } = new();
        }
    }
}
