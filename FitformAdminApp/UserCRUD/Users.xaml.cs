using FitprojectAPI.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Windows;

namespace FitFormAdminApp
{
    public partial class Users : Window
    {
        public HttpClient httpClient;
        private List<FitprojectUser> users;

        public Users()
        {
            InitializeComponent();
            httpClient = MainWindow.sharedClient;

            // NE itt hívd meg az async dolgokat!
            this.Loaded += Users_Loaded;
        }

        private async void Users_Loaded(object sender, RoutedEventArgs e)
        {
            users = await UserList(httpClient);
            dtgFelhasznalok.ItemsSource = users;
        }

        private static async Task<List<FitprojectUser>> UserList(HttpClient client)
        {
            try
            {
                var list = await client.GetFromJsonAsync<List<FitprojectUser>>("api/User/User");
                return list;
            }
            catch (Exception ex)
            {
                return new List<FitprojectUser>() {
                    new FitprojectUser() { Name = $"Hiba: {ex.Message}" }
                };
            }
        }
    }
}
