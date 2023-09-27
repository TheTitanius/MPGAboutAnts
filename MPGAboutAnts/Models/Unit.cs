namespace MPGAboutAnts.Models
{
	public class Unit : IEntity
	{
		public int Id { get; set; }
		public UnitType Type { get; set; }
		public Player Player { get; set; }
		public Hex Hex { get; set; }
		public int Hp { get; set; }
		public int Damage { get; set; }
		public int HexId { get; set; }
	}
}
