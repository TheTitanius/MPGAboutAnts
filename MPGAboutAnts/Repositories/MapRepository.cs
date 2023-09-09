using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;

namespace MPGAboutAnts.Repositories
{
	public class MapRepository : Repository<Map>
	{
		public MapRepository(WebApplication app, string entities) : base(app, entities)
		{
		}

		protected override DbSet<Map> DbSet => _db.Maps;

		protected override void Change() { }
	}
}
