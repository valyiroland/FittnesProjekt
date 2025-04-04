using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using FitprojectAPI.Models;

namespace FitFormAdminApp.UserCRUD
{
    public partial class UserDelete : Window
    {
        public HttpClient httpClient;
        private List<FitprojectUser> users;

        public UserDelete()
        {
            InitializeComponent();
            httpClient = MainWindow.sharedClient;

            
            LoadUsersAsync();
        }

        private async void LoadUsersAsync()
        {
            try
            {
                users = await UserList(httpClient);
                DgFelhasznalok.ItemsSource = users; 
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading users: {ex.Message}");
            }
        }

        private static async Task<List<FitprojectUser>> UserList(HttpClient client)
        {
            try
            {
                List<FitprojectUser> list = await client.GetFromJsonAsync<List<FitprojectUser>>("api/User/User");
                return list;
            }
            catch (Exception ex)
            {
                return new List<FitprojectUser>() { new FitprojectUser() { Name = ex.Message } };
            }
        }

       
        private async void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            var button = sender as Button;
            var user = button?.DataContext as FitprojectUser;

            if (user != null)
            {
                var confirmation = MessageBox.Show($"Are you sure you want to delete {user.Name}?", "Confirm Deletion", MessageBoxButton.YesNo);
                if (confirmation == MessageBoxResult.Yes)
                {
                    try
                    {
                       
                        var response = await httpClient.DeleteAsync($"api/User/Delete?Id={user.Id}");

                        
                        if (response.IsSuccessStatusCode)
                        {
                            MessageBox.Show("User deleted successfully.");
                            users.Remove(user);  
                            DgFelhasznalok.ItemsSource = null;
                            DgFelhasznalok.ItemsSource = users; 
                        }
                        else
                        {
                           
                            string errorMessage = await response.Content.ReadAsStringAsync();
                            MessageBox.Show($"Failed to delete user. Error: {errorMessage}");
                        }
                    }
                    catch (Exception ex)
                    {
                        
                        MessageBox.Show($"Error deleting user: {ex.Message}");
                    }
                }
            }
        }

      
        private void RefreshButton_Click(object sender, RoutedEventArgs e)
        {
            LoadUsersAsync();  
        }
    }
}
