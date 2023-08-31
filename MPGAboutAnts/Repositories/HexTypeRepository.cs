using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;

namespace MPGAboutAnts.Repositories
{
	public class HexTypeRepository : Repository<HexType>
	{
		public HexTypeRepository(WebApplication app, string entities) : base(app, entities)
		{
		}

		protected override DbSet<HexType> DbSet => _db.HexTypes;

		protected override void Change()
		{
			
		}
	}
}
