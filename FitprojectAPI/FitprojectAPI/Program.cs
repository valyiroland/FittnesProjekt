
namespace FitprojectAPI
{
    public class Program
    {
        public static int SaltLength = 64;

        public static string GenerateSalt()
        {
            Random random = new Random();
            string karakterek = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string salt = "";
            for (int i = 0; i < SaltLength; i++)
            {
                salt += karakterek[random.Next(karakterek.Length)];
            }
            return salt;
        }



        public static string CreateSHA256(string input)
        {
            using (SHA256 sha256 = SHA256.Create()) 
            {
                byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                return sBuilder.ToString();
            }
        }

        public static Dictionary<string, User> LoggedInUsers = new Dictionary<string, User>();

        public static async Task SendEmail(string mailAddressTo, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("coder.media1@gmail.com");
            mail.To.Add(mailAddressTo);
            mail.Subject = subject;
            mail.Body = body;
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential("coder.media1@gmail.com", "qmfonxwxejrysfnb");
            smtpClient.EnableSsl = true;
            await smtpClient.SendMailAsync(mail);
        }
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
