namespace Conversor22.Models
{
    public class Conversion
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string FromCurrency { get; set; } = string.Empty; // Inicialización
        public decimal Result { get; set; }
        public string ToCurrency { get; set; } = string.Empty; // Inicialización
        public DateTime Date { get; set; }
    }
}
