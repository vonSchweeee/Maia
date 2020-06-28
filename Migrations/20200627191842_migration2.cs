using Microsoft.EntityFrameworkCore.Migrations;

namespace Maia.Migrations
{
    public partial class migration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UrlYoutube",
                table: "Musicas",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UrlYoutube",
                table: "Musicas");
        }
    }
}
