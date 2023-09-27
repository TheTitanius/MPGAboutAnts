using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;

namespace MPGAboutAnts.Repositories
{
	public class UnitTypeRepository : Repository<UnitType>
	{
		public UnitTypeRepository(WebApplication app, string entities) : base(app, entities)
		{
		}

		protected override DbSet<UnitType> DbSet => _db.UnitTypes;

		protected override void Change() { }
	}
}
