using Microsoft.EntityFrameworkCore.Migrations;

namespace Maia.Migrations
{
    public partial class migration4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "urlImagem",
                table: "Musicas",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "Favoritos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Biografia",
                table: "Artistas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "urlImagem",
                table: "Albums",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "urlImagem",
                table: "Musicas");

            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "Favoritos");

            migrationBuilder.DropColumn(
                name: "Biografia",
                table: "Artistas");

            migrationBuilder.DropColumn(
                name: "urlImagem",
                table: "Albums");
        }
    }
}
