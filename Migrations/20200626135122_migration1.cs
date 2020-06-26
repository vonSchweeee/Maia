using Microsoft.EntityFrameworkCore.Migrations;

namespace Maia.Migrations
{
    public partial class migration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Afinacao",
                table: "Tabs",
                maxLength: 8,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Tabs",
                maxLength: 140,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Titulo",
                table: "Tabs",
                maxLength: 90,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Titulo",
                table: "Partituras",
                maxLength: 90,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Afinacao",
                table: "Tabs");

            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Tabs");

            migrationBuilder.DropColumn(
                name: "Titulo",
                table: "Tabs");

            migrationBuilder.DropColumn(
                name: "Titulo",
                table: "Partituras");
        }
    }
}
