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
	}
}
