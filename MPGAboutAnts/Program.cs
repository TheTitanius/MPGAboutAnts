using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Repositories;

namespace MPGAboutAnts
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddControllersWithViews();

			string connection = builder.Configuration.GetConnectionString("DefaultConnection");
			builder.Services.AddDbContext<Context>(options => options.UseNpgsql(connection));


			var app = builder.Build();

			//using (Context db = app.Services.CreateScope().ServiceProvider.GetServices<Context>().First())
			//{
			//	db.HexTypes.Add(new HexType() { Name = "Земля" });
			//	db.HexTypes.Add(new HexType() { Name = "Вода" });
			//}

			if (!app.Environment.IsDevelopment())
			{
				app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			HexTypeRepository hexTypeRepository = new(app, "hexType");

			app.UseRouting();

			app.UseAuthorization();

			app.MapControllerRoute(
				name: "default",
				pattern: "{controller=Home}/{action=Index}/{id?}");

			app.Run();
		}
	}
}