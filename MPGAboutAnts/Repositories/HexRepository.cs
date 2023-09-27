using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;
using System.Diagnostics.Contracts;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace MPGAboutAnts.Repositories
{
	public class HexRepository : Repository<Hex>
	{
		public HexRepository(WebApplication app, string entities) : base(app, entities)
		{
			GetAllHexInMap();
		}

		protected override DbSet<Hex> DbSet => _db.Hexes;

		protected override void Change() { }
		private void GetAllHexInMap()
		{
			app.MapGet($"/api/{entities}/fromMap/{{mapId:int}}", async (int mapId) =>
			{
				List<Hex> entities = await DbSet
					.Where(h => h.Map.Id == mapId)
					.Include(p => p.HexType)
					.Include(p => p.Unit)
					.Include(p => p.Unit.Type)
					.Include(p => p.Unit.Player)
					.ToListAsync();
				return Results.Json(entities,
					new JsonSerializerOptions
					{
						PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
						ReferenceHandler = ReferenceHandler.IgnoreCycles,
					});
			});
		}

		protected override void Add()
		{
			app.MapPost($"/api/{entities}", async (Hex entity) =>
			{
				entity.Map = _db.Maps.Where(p => p.Id == entity.Map.Id).First();
				entity.HexType = entity.HexType == null ? null : _db.HexTypes.Where(p => p.Id == entity.HexType.Id).First();
				// добавляем сущность в массив
				await DbSet.AddAsync(entity);
				await _db.SaveChangesAsync();
				return Results.Json(entity);
			});
		}
	}
}
