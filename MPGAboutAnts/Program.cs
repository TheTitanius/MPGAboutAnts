using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;
using MPGAboutAnts.Repositories;
using System.Text.Json.Serialization;

namespace MPGAboutAnts
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddControllersWithViews().AddJsonOptions(options =>
			{
				options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
			});

			string connection = builder.Configuration.GetConnectionString("DefaultConnection");
			builder.Services.AddDbContext<Context>(options => options.UseNpgsql(connection));


			var app = builder.Build();

			//Context db = app.Services.CreateScope().ServiceProvider.GetServices<Context>().First();
			//db.HexTypes.Add(new HexType() { Name = "Земля" });
			//db.HexTypes.Add(new HexType() { Name = "Вода" });

			//db.UnitTypes.Add(new UnitType() { Type = "Обычный" });
			//db.UnitTypes.Add(new UnitType() { Type = "Воин" });
			//db.SaveChanges();

			if (!app.Environment.IsDevelopment())
			{
				app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			HexTypeRepository hexTypeRepository = new(app, "hexType");
			MapRepository mapRepository = new(app, "map");
			HexRepository hexRepository = new(app, "hex");
			PlayerRepository playerRepository = new(app, "player");
			UnitTypeRepository unitType = new(app, "unitType");
			UnitRepository unitRepository = new(app, "unit");

			app.UseRouting();

			app.UseAuthorization();

			app.MapControllerRoute(
				name: "default",
				pattern: "{controller=Home}/{action=Index}/{id?}");

			app.Run();
		}
	}
}