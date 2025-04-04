using FitFormAdminApp.UserCRUD;
using FitprojectAPI.DTOs;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Windows;

namespace FitFormAdminApp
{
    public partial class MainWindow : Window
    {
        public static string uId = "";

        public static HttpClient sharedClient = new HttpClient()
        {
            BaseAddress = new Uri("http://localhost:5071")
        };

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

        public MainWindow()
        {
            InitializeComponent();
        }

        private void MenuUserList_Click(object sender, RoutedEventArgs e)
        {
            Users userWindow = new Users();
            userWindow.ShowDialog();
        }

        private async void btnBejelentkezes_Click(object sender, RoutedEventArgs e)
        {
            var response = await sharedClient.PostAsync($"api/Login/GetSalt/{tbLoginName.Text}",
                new StringContent(tbLoginName.Text, Encoding.UTF8, "text/plain"));
            string salt = await response.Content.ReadAsStringAsync();

            LoginDTO dto = new LoginDTO()
            {
                LoginName = tbLoginName.Text,
                TmpHash = CreateSHA256(pbPassword.Password + salt)
            };
            string json = JsonSerializer.Serialize(dto, JsonSerializerOptions.Default);
            var body = new StringContent(json, Encoding.UTF8, "application/json");

            var valasz = await sharedClient.PostAsync("api/Login/", body);
            string userstring = await valasz.Content.ReadAsStringAsync();
            MessageBox.Show(userstring);

            if (valasz.IsSuccessStatusCode)
            {
                JsonSerializerOptions jsonOptions = new JsonSerializerOptions()
                {
                    PropertyNameCaseInsensitive = true
                };
                LoggedInUser logged = JsonSerializer.Deserialize<LoggedInUser>(userstring, jsonOptions);
                uId = logged.Token;
            }

            if (uId != "")
            {
                btnBejelentkezes.IsEnabled = false;
                btnKijelentkezes.IsEnabled = true;
                menuFelhasznalok.IsEnabled = true;
            }
            else
            {
                MessageBox.Show($"Sikertelen bejelentkezés!");
            }
        }

        private async void btnKijelentkezes_Click(object sender, RoutedEventArgs e)
        {
            var response = await sharedClient.PostAsync($"api/Logout/{uId}",
                new StringContent(uId, Encoding.UTF8, "text/plain"));
            string valasz = await response.Content.ReadAsStringAsync();

            if (uId != "")
            {
                btnBejelentkezes.IsEnabled = true;
                btnKijelentkezes.IsEnabled = false;
                menuFelhasznalok.IsEnabled = false;
            }
            else
            {
                MessageBox.Show($"Sikertelen kijelentkezés\n{valasz}");
            }
        }

        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            UserDelete userWindow = new UserDelete();
            userWindow.ShowDialog();

        }
    }
}
