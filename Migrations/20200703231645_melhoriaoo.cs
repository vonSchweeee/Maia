using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Maia.Migrations
{
    public partial class melhoriaoo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataPub",
                table: "Comentarios",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataPub",
                table: "Comentarios");
        }
    }
}
