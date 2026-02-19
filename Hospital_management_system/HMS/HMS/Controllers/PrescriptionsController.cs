using HMS.Data;
using HMS.DTOs;
using HMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static HMS.DTOs.PrescriptionDtos;

namespace HMS.Controllers
{
    [ApiController]
    [Route("api/prescriptions")]
    public class PrescriptionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PrescriptionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/prescriptions
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.Prescriptions
                .Include(p => p.PrescriptionMedicines)
                .ThenInclude(pm => pm.Medicine)
                .OrderByDescending(p => p.Id)
                .ToListAsync();

            return Ok(data);
        }

        // GET: api/prescriptions/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var p = await _context.Prescriptions
                .Include(x => x.PrescriptionMedicines)
                .ThenInclude(pm => pm.Medicine)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (p == null) return NotFound("Prescription not found");
            return Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PrescriptionCreateUpdateDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid payload");

            if (dto.Items == null || dto.Items.Count == 0)
                return BadRequest("At least one medicine is required.");

            // ✅ Create prescription AND initialize list
            var prescription = new Prescription
            {
                DoctorId = dto.DoctorId,
                PatientId = dto.PatientId,
                PrescriptionDate = dto.PrescriptionDate ?? DateTime.Now,
                PrescriptionMedicines = new List<PrescriptionMedicine>() // ⭐ THIS LINE
            };

            // ✅ Add medicines
            foreach (var item in dto.Items)
            {
                prescription.PrescriptionMedicines.Add(new PrescriptionMedicine
                {
                    MedicineId = item.MedicineId,
                    Dosage = item.Dosage ?? "",
                    Days = item.Days,
                    Instructions = item.Instructions ?? ""
                });
            }

            // ✅ Save to DB
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();

            return Ok(prescription);
        }


        // PUT: api/prescriptions/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] PrescriptionDtos.PrescriptionCreateUpdateDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request body.");

            var existing = await _context.Prescriptions
                .Include(p => p.PrescriptionMedicines)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (existing == null) return NotFound("Prescription not found");

            if (dto.Items == null || dto.Items.Count == 0)
                return BadRequest("At least one medicine is required.");

            // ✅ validate medicines exist
            var medicineIds = dto.Items.Select(i => i.MedicineId).Distinct().ToList();

            var existingCount = await _context.Medicines
                .CountAsync(m => medicineIds.Contains(m.Id));

            if (existingCount != medicineIds.Count)
                return BadRequest("One or more MedicineId not found.");

            // update header
            existing.DoctorId = dto.DoctorId;
            existing.PatientId = dto.PatientId;
            existing.PrescriptionDate = dto.PrescriptionDate ?? existing.PrescriptionDate;

            // replace items
            _context.PrescriptionMedicines.RemoveRange(existing.PrescriptionMedicines);

            existing.PrescriptionMedicines = dto.Items.Select(item => new PrescriptionMedicine
            {
                PrescriptionId = existing.Id,
                MedicineId = item.MedicineId,
                Dosage = item.Dosage ?? "",
                Days = item.Days,
                Instructions = item.Instructions ?? ""
            }).ToList();

            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // DELETE: api/prescriptions/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _context.Prescriptions
                .Include(p => p.PrescriptionMedicines)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (existing == null) return NotFound("Prescription not found");

            _context.Prescriptions.Remove(existing);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
