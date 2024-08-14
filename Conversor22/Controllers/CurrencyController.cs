using Conversor22.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace Conversor22.Controllers
{
    public class CurrencyController : Controller
    {
        private readonly string _connectionString;

        public CurrencyController()
        {
            _connectionString = "Server=DESKTOP-76876\\SQLEXPRESS;Database=ConversionHistorialDB;Integrated Security=True;";
        }

        public IActionResult Historial()
        {
            List<Conversion> conversiones = ObtenerConversionesDesdeLaBaseDeDatos();
            return View(conversiones);
        }

        private List<Conversion> ObtenerConversionesDesdeLaBaseDeDatos()
        {
            List<Conversion> conversiones = new List<Conversion>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT Amount, FromCurrency, Result, ToCurrency, Date FROM Conversion";
                SqlCommand command = new SqlCommand(query, connection);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    Conversion conversion = new Conversion
                    {
                        Amount = reader.GetDecimal(0),
                        FromCurrency = reader.GetString(1),
                        Result = reader.GetDecimal(2),
                        ToCurrency = reader.GetString(3),
                        Date = reader.GetDateTime(4)
                    };
                    conversiones.Add(conversion);
                }
                reader.Close();
            }
            return conversiones;
        }

        [HttpPost]
        public async Task<IActionResult> Convert(string amount, string fromCurrency, string result, string toCurrency)
        {
            try
            {
                decimal parsedAmount;
                decimal parsedResult;

                // Convertir los valores a decimal, usando CultureInfo.InvariantCulture para asegurarse de que los puntos sean tratados como decimales
                if (!decimal.TryParse(amount, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out parsedAmount) ||
                    !decimal.TryParse(result, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out parsedResult))
                {
                    return BadRequest("Invalid amount or result format");
                }

                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    string query = "INSERT INTO Conversion (Amount, FromCurrency, Result, ToCurrency, Date) VALUES (@Amount, @FromCurrency, @Result, @ToCurrency, @Date)";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Amount", parsedAmount);
                        command.Parameters.AddWithValue("@FromCurrency", fromCurrency);
                        command.Parameters.AddWithValue("@Result", parsedResult);
                        command.Parameters.AddWithValue("@ToCurrency", toCurrency);
                        command.Parameters.AddWithValue("@Date", DateTime.Now);

                        await command.ExecuteNonQueryAsync();
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al guardar en la base de datos: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult LimpiarHistorial()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    string query = "DELETE FROM Conversion";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }

                return RedirectToAction("Historial");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al limpiar el historial: {ex.Message}");
            }
        }
    }
}