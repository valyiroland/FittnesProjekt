using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace FitformAdminApp
{
    public partial class MainWindow : Window
    {
        private readonly HttpClient _httpClient = new() { BaseAddress = new Uri("http://localhost:5071/") };
        private string _token;
        private string _username;
        private string _email;

        public MainWindow()
        {
            InitializeComponent();
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text.Trim();
            string password = PasswordBox.Password.Trim();

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Felhasználónév és jelszó megadása kötelező!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                HttpResponseMessage saltResponse = await _httpClient.PostAsync($"api/Login/GetSalt/{username}", null);
                if (!saltResponse.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikertelen bejelentkezés, ellenőrizze adatait!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string salt = await saltResponse.Content.ReadAsStringAsync();
                string hashedPassword = ComputeSha256Hash(password + salt);

                var loginDTO = new
                {
                    LoginName = username,
                    TmpHash = hashedPassword
                };

                string jsonContent = JsonConvert.SerializeObject(loginDTO);
                var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                HttpResponseMessage loginResponse = await _httpClient.PostAsync("api/Login", httpContent);

                if (!loginResponse.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikertelen bejelentkezés, ellenőrizze adatait!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                string responseBody = await loginResponse.Content.ReadAsStringAsync();
                var loginData = JsonConvert.DeserializeObject<LoginResponse>(responseBody);

                if (loginData != null)
                {
                    _token = loginData.Token;
                    _username = loginData.Nev;
                    _email = loginData.Email;

                    MessageBox.Show($"Sikeres bejelentkezés! Üdv, {_username}!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);

                    // Új ablak megnyitása és a jelenlegi bezárása
                    AdminWindow adminWindow = new AdminWindow(_token, _username, _email);
                    adminWindow.Show();
                    this.Close();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private static string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public class LoginResponse
        {
            public string Token { get; set; }
            public string Nev { get; set; }
            public string Email { get; set; }
        }

        private void ExitButton_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }
    }
}
