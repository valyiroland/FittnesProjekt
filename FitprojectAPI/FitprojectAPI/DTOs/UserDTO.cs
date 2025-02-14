namespace FitprojectAPI.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; } 
        public string UserEmail { get; set; } 
        public int UserCalorieCount { get; set; }
        public int UserHeight { get; set; }
        public decimal UserWeight { get; set; }
        public decimal UserBmiValue { get; set; }

    }
}
