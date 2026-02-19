using System.ComponentModel.DataAnnotations;

namespace HMS.Models
{
    public class Medicine
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Category { get; set; }
        public string Dosage { get; set; }

        public double Price { get; set; }
        public int Quantity { get; set; }

        public DateTime ExpiryDate { get; set; }
    }
}
