using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;

namespace MPGAboutAnts.Repositories
{
	public class PlayerRepository : Repository<Player>
	{
		public PlayerRepository(WebApplication app, string entities) : base(app, entities)
		{
		}

		protected override DbSet<Player> DbSet => _db.Players;

		protected override void Change()
		{
		}
	}
}
