using System;
using System.Windows;

namespace FitformAdminApp
{
    public partial class AdminWindow : Window
    {
        private readonly string _token;
        private readonly string _username;
        private readonly string _email;

        public AdminWindow(string token, string username, string email)
        {
            InitializeComponent();
            _token = token;
            _username = username;
            _email = email;

            
            LoggedInUserTextBlock.Text = _username;
            EmailTextBlock.Text = _email;
        }

        private void AddUser_Click(object sender, RoutedEventArgs e)
        {
            var postWindow = new UserPost(_token, _username, _email);
            postWindow.Show();
            this.Close();
        }

        private void ModifyUser_Click(object sender, RoutedEventArgs e)
        {
            var putWindow = new UserPut(_token, _username, _email);
            putWindow.Show();
            this.Close();
        }

        private void RemoveUser_Click(object sender, RoutedEventArgs e)
        {
            var deleteWindow = new UserDelete(_token, _username, _email);
            deleteWindow.Show();
            this.Close();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }
    }
}
