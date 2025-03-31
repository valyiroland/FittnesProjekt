using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace FitformAdminApp
{
    public partial class UserPut : Window
    {
        private static readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5271/") };

        private readonly string _token;
        private readonly string _username;
        private readonly string _email;

        public UserPut(string token, string username, string email)
        {
            InitializeComponent();
            _token = token;
            _username = username;
            _email = email;
        }

        private async void ModifyButton_Click(object sender, RoutedEventArgs e)
        {
            // A szükséges mezők értékeinek bekérése
            string idText = tbId.Text.Trim();
            string name = tbName.Text.Trim();
            string email = tbEmail.Text.Trim();
            string salt = tbSalt.Text.Trim();
            string hash = tbHash.Text.Trim();
            string gender = tbGender.Text.Trim();
            string jogosultsagText = tbJogosultsag.Text.Trim();
            bool aktiv = cbAktiv.IsChecked.GetValueOrDefault(); // Ha nincs kijelölve, alapértelmezett érték: false

            // Validálás: ha nem töltötték ki az ID, név, vagy e-mail mezőket
            if (string.IsNullOrEmpty(idText) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email))
            {
                MessageBox.Show("Kérem, töltse ki az összes kötelező mezőt!");
                return;
            }

            // Biztonságos numerikus konverzió
            if (!int.TryParse(idText, out int id))
            {
                MessageBox.Show("Érvénytelen ID formátum!");
                return;
            }

            int jogosultsag = 0; // Alapértelmezett érték
            if (!string.IsNullOrEmpty(jogosultsagText) && !int.TryParse(jogosultsagText, out jogosultsag))
            {
                MessageBox.Show("Érvénytelen jogosultság formátum!");
                return;
            }

            // Felhasználói adatok objektumba foglalása
            var userToUpdate = new
            {
                Id = id,
                Name = name,
                Email = email,
                Salt = salt,
                Hash = hash,
                Gender = gender,
                Jogosultsag = jogosultsag,
                Aktiv = aktiv
            };

            // JSON-ba alakítjuk az objektumot
            var jsonContent = JsonConvert.SerializeObject(userToUpdate);
            var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            try
            {
                // PUT kérés elküldése
                var response = await _httpClient.PutAsync($"api/FitprojectUser/{id}", httpContent);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Felhasználó sikeresen módosítva!");
                }
                else
                {
                    string errorMessage = await response.Content.ReadAsStringAsync();
                    MessageBox.Show($"Hiba történt: {response.StatusCode}\n{errorMessage}");
                }
            }
            catch (Exception ex)
            {
                // Hiba esetén értesítjük a felhasználót
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            AdminWindow adminWindow = new AdminWindow(_token, _username, _email);
            adminWindow.Show();
            this.Close();
        }
    }
}
