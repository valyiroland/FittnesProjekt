using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Windows;
using System.Xml.Linq;
using FitFormAdminApp;
using FitFormAdminApp.UserCRUD;
using FitprojectAPI.Models;

namespace FitformAdminApp.IngredientCRUD
{
    public partial class IngredientAdd : Window
    {
        private readonly HttpClient _client = MainWindow.sharedClient;

        public IngredientAdd()
        {
            InitializeComponent();
        }

        private async void BtnAdd_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var newIngredient = new FitprojectIngredient
                {
                    Name = tbName.Text,
                    CalPer100g = decimal.Parse(tbCalPer100g.Text),
                    Description = tbDescription.Text,
                    ImageUrl = tbImageUrl.Text,
                    CategoryId = int.Parse(tbCategoryId.Text)
                };

                var response = await _client.PostAsJsonAsync("/Ingredients/newIngredients", newIngredient);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres hozzáadás!");
                    Close();
                }
                else
                {
                    var errorMessage = await response.Content.ReadAsStringAsync();
                    MessageBox.Show($"Szerver válasz: {response.StatusCode}\n{errorMessage}");
                }
            }
            catch (FormatException)
            {
                MessageBox.Show("Ellenőrizd a szám mezőket (pl. Kalória, Kategória ID)!");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt:\n{ex.Message}");
            }
        }
    }
}
