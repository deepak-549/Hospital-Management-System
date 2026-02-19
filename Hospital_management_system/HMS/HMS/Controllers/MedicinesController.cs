using HMS.Data;
using HMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HMS.Controllers
{
    [ApiController]
    [Route("api/medicines")]
    public class MedicinesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MedicinesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Medicines.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Medicine medicine)
        {
            _context.Medicines.Add(medicine);
            await _context.SaveChangesAsync();
            return Ok(medicine);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Medicine medicine)
        {
            var existing = await _context.Medicines.FindAsync(id);
            if (existing == null) return NotFound("Medicine not found");

            existing.Name = medicine.Name;
            existing.Category = medicine.Category;
            existing.Dosage = medicine.Dosage;
            existing.Price = medicine.Price;
            existing.Quantity = medicine.Quantity;
            existing.ExpiryDate = medicine.ExpiryDate;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _context.Medicines.FindAsync(id);
            if (existing == null) return NotFound("Medicine not found");

            _context.Medicines.Remove(existing);
            await _context.SaveChangesAsync();
            return NoContent();


        }
    }
}