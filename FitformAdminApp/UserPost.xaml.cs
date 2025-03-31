using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Newtonsoft.Json;

namespace FitformAdminApp
{
    public partial class UserPost : Window
    {
        private readonly string _token;
        private readonly string _username;
        private readonly string _email;

        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5071/") };

        // Konstruktor, amely három paramétert vár
        public UserPost(string token, string username, string email)
        {
            InitializeComponent();
            _token = token;
            _username = username;
            _email = email;
        }

        // Felhasználó hozzáadása
        private async void AddButton_Click(object sender, RoutedEventArgs e)
        {
            string name = tbName.Text;
            string email = tbEmail.Text;
            string salt = tbSalt.Text;
            string hash = tbHash.Text;
            string gender = tbGender.Text;
            string permissions = tbJogosultsag.Text;
            bool isActive = cbAktiv.IsChecked ?? false;

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(salt) || string.IsNullOrWhiteSpace(hash) ||
                string.IsNullOrWhiteSpace(gender) || string.IsNullOrWhiteSpace(permissions))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var newUser = new
            {
                Name = name,
                Email = email,
                Salt = salt,
                Hash = hash,
                Gender = gender,
                Aktiv = isActive ? 1 : 0,
                Jogosultsag = permissions
            };

            string jsonContent = JsonConvert.SerializeObject(newUser);
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync("api/FitprojectUser", httpContent);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Felhasználó sikeresen hozzáadva!");
                    this.Close();
                }
                else
                {
                    MessageBox.Show($"Hiba történt: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        // Vissza gomb megnyomásával az AdminWindow-ra
        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            AdminWindow adminWindow = new AdminWindow(_token, _username, _email);
            adminWindow.Show();
            this.Close();
        }
    }
}
