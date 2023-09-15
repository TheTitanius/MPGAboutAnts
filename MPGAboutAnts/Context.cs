using Microsoft.EntityFrameworkCore;
using MPGAboutAnts.Models;

namespace MPGAboutAnts
{
    public class Context : DbContext
	{
		public Context(DbContextOptions<Context> options) : base(options)
		{
			//Database.EnsureDeleted();
			//Database.EnsureCreated();
		}

		public DbSet<HexType> HexTypes { get; set; }
		public DbSet<Map> Maps { get; set; }
		public DbSet<Hex> Hexes { get; set; }
		public DbSet<Unit> Units { get; set; }
		public DbSet<UnitType> UnitTypes { get; set; }
		public DbSet<Player> Players { get; set; }
	}
}
