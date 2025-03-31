using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace FitformAdminApp
{
    public partial class UserDelete : Window
    {
        private readonly HttpClient _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5071/") };
        private string _token;
        private string _userName;
        private string _userEmail;

        public UserDelete(string token, string name, string email)
        {
            InitializeComponent();
            _token = token;
            _userName = name;
            _userEmail = email;
        }

        public class FitprojectUser
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Hash { get; set; }
            public string Salt { get; set; }
            public string Gender { get; set; }
            public int Aktiv { get; set; }
            public int Jogosultsag { get; set; }
            public DateTime? RegisztracioDatum { get; set; }
        }

        private async Task LoadUsers()
        {
            try
            {
                var response = await _httpClient.GetAsync("api/FitprojectUser");
                if (response.IsSuccessStatusCode)
                {
                    var users = JsonConvert.DeserializeObject<List<FitprojectUser>>(await response.Content.ReadAsStringAsync());
                    dtgUsers.ItemsSource = new ObservableCollection<FitprojectUser>(users);
                }
                else
                {
                    MessageBox.Show("Nem sikerült a felhasználók betöltése.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}");
            }
        }

        private async void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(tbId.Text))
            {
                try
                {
                    var response = await _httpClient.DeleteAsync($"api/FitprojectUser/{tbId.Text}");
                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Felhasználó sikeresen eltávolítva!");
                        tbId.Text = "";
                        await LoadUsers();
                    }
                    else
                    {
                        MessageBox.Show("Hiba történt: " + response.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba történt: {ex.Message}");
                }
            }
            else
            {
                MessageBox.Show("Adjon meg egy érvényes ID-t!");
            }
        }

        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            AdminWindow adminWindow = new AdminWindow(_token, _userName, _userEmail);
            adminWindow.Show();
            this.Close();
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadUsers();
        }
    }
}