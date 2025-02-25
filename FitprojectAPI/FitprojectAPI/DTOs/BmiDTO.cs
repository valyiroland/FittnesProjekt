namespace FitprojectAPI.DTOs
{
    public class BmiDto
    {
        public int UserId { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public decimal BmiValue { get; set; }
    }
}
