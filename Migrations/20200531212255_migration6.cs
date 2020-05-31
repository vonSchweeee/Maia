using Microsoft.EntityFrameworkCore.Migrations;

namespace Maia.Migrations
{
    public partial class migration6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albuns_Artistas_ArtistaId",
                table: "Albuns");

            migrationBuilder.DropForeignKey(
                name: "FK_Musicas_Albuns_AlbumId",
                table: "Musicas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Albuns",
                table: "Albuns");

            migrationBuilder.DropColumn(
                name: "MusicaId",
                table: "Posts");

            migrationBuilder.RenameTable(
                name: "Albuns",
                newName: "Albums");

            migrationBuilder.RenameIndex(
                name: "IX_Albuns_ArtistaId",
                table: "Albums",
                newName: "IX_Albums_ArtistaId");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "Musicas",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Albums",
                table: "Albums",
                column: "AlbumId");

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Artistas_ArtistaId",
                table: "Albums",
                column: "ArtistaId",
                principalTable: "Artistas",
                principalColumn: "ArtistaId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Musicas_Albums_AlbumId",
                table: "Musicas",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "AlbumId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Artistas_ArtistaId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Musicas_Albums_AlbumId",
                table: "Musicas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Albums",
                table: "Albums");

            migrationBuilder.RenameTable(
                name: "Albums",
                newName: "Albuns");

            migrationBuilder.RenameIndex(
                name: "IX_Albums_ArtistaId",
                table: "Albuns",
                newName: "IX_Albuns_ArtistaId");

            migrationBuilder.AddColumn<long>(
                name: "MusicaId",
                table: "Posts",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "Musicas",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Albuns",
                table: "Albuns",
                column: "AlbumId");

            migrationBuilder.AddForeignKey(
                name: "FK_Albuns_Artistas_ArtistaId",
                table: "Albuns",
                column: "ArtistaId",
                principalTable: "Artistas",
                principalColumn: "ArtistaId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Musicas_Albuns_AlbumId",
                table: "Musicas",
                column: "AlbumId",
                principalTable: "Albuns",
                principalColumn: "AlbumId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
