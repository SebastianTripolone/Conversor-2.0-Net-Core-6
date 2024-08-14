var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    // Rutas Personalizadas que conecta con el Controlador Default ( En este caso seria: HomeController )
    endpoints.MapControllerRoute(
        name: "Inicio",
        pattern: "Inicio",
        defaults: new { controller = "Home", action = "Index" });

    endpoints.MapControllerRoute(
        name: "Historial",
        pattern: "Historial",
        defaults: new { controller = "Currency", action = "Historial" });

    endpoints.MapControllerRoute(
        name: "Graficos",
        pattern: "Graficos",
        defaults: new { controller = "Home", action = "Graficos" });

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});

app.Run();