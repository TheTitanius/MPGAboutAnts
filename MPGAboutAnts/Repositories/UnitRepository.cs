using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;
using System;
using System.Diagnostics.Contracts;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MPGAboutAnts.Repositories
{
	public class UnitRepository : Repository<Unit>
	{
		public UnitRepository(WebApplication app, string entities) : base(app, entities)
		{
		}

		protected override void Add()
		{
			app.MapPost($"/api/{entities}", async (Unit entity) =>
			{
				//HttpRequest request
				//request.EnableBuffering();
				//request.Body.Position = 0;
				//var rawRequestBody = await new StreamReader(request.Body).ReadToEndAsync();
				//Console.WriteLine(rawRequestBody);
				//var entity = await request.ReadFromJsonAsync<Unit>();
				entity.Hex = await _db.Hexes.FindAsync(entity.Hex.Id);
				entity.Type = await _db.UnitTypes.FindAsync(entity.Type.Id);
				entity.Player = await _db.Players.FindAsync(entity.Player.Id);

				await DbSet.AddAsync(entity);
				await _db.SaveChangesAsync();

				Hex hex = await _db.Hexes.FindAsync(entity.Hex.Id);
				hex.Unit = await _db.Units.FindAsync(entity.Id);
				_db.Hexes.Update(hex);
				await _db.SaveChangesAsync();
				return Results.Json(entity,
					new JsonSerializerOptions
					{
						ReferenceHandler = ReferenceHandler.IgnoreCycles,
						PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
					});
			});
		}

		protected override void GetAll()
		{
			app.MapGet($"/api/{entities}", async () =>
			{
				List<Unit> entities = await DbSet.Include(p => p.Type).Include(p => p.Hex).ToListAsync();
				return Results.Json(entities,
					new JsonSerializerOptions
					{
						PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
						ReferenceHandler = ReferenceHandler.IgnoreCycles,
					});
			});
		}

		protected override DbSet<Unit> DbSet => _db.Units;

		protected override void Change() { }
	}
}
