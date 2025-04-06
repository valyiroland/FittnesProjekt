using FitFormAdminApp;
using FitprojectAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace FitformAdminApp.IngredientCRUD
{
    /// <summary>
    /// Interaction logic for Ingredient.xaml
    /// </summary>
    public partial class Ingredient : Window
    {
        private readonly HttpClient _client = MainWindow.sharedClient;

        public Ingredient()
        {
            InitializeComponent();
        }

        private async void BtnQuery_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var selectedItem = cbCategory.SelectedItem as ComboBoxItem;
                if (selectedItem == null)
                {
                    MessageBox.Show("Válassz ki egy kategóriát!");
                    return;
                }

                int categoryId = int.Parse(selectedItem.Content.ToString());

                var response = await _client.GetAsync($"/Ingredients/category/{categoryId}");

                if (response.IsSuccessStatusCode)
                {
                    var ingredients = await response.Content.ReadFromJsonAsync<List<FitprojectIngredient>>();
                    dgIngredients.ItemsSource = ingredients;
                }
                else
                {
                    var error = await response.Content.ReadAsStringAsync();
                    MessageBox.Show($"Szerver válasz: {response.StatusCode}\n{error}");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba: {ex.Message}");
            }
        }

       
    }
}