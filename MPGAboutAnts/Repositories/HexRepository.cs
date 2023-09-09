using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;
using System.Diagnostics.Contracts;

namespace MPGAboutAnts.Repositories
{
	public class HexRepository : Repository<Hex>
	{
		public HexRepository(WebApplication app, string entities) : base(app, entities)
		{
			GetAllHexInMap();
		}

		protected override DbSet<Hex> DbSet => _db.Hexes;

		protected override void Change(){}
		private void GetAllHexInMap()
		{
			app.MapGet($"/api/{entities}/fromMap/{{mapId:int}}", async (int mapId) => await DbSet.Where(h => h.Map.Id == mapId).Include(p => p.HexType).Include(p => p.Unit).ToListAsync());
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
