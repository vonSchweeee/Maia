using Microsoft.EntityFrameworkCore.Migrations;

namespace Maia.Migrations
{
    public partial class migration7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "MusicaId",
                table: "Posts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Respostas_UsuarioId",
                table: "Respostas",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AlbumId",
                table: "Posts",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_MusicaId",
                table: "Posts",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_UsuarioId",
                table: "Comentarios",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comentarios_Usuarios_UsuarioId",
                table: "Comentarios",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Albums_AlbumId",
                table: "Posts",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "AlbumId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Musicas_MusicaId",
                table: "Posts",
                column: "MusicaId",
                principalTable: "Musicas",
                principalColumn: "MusicaId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Respostas_Usuarios_UsuarioId",
                table: "Respostas",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comentarios_Usuarios_UsuarioId",
                table: "Comentarios");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Albums_AlbumId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Musicas_MusicaId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Respostas_Usuarios_UsuarioId",
                table: "Respostas");

            migrationBuilder.DropIndex(
                name: "IX_Respostas_UsuarioId",
                table: "Respostas");

            migrationBuilder.DropIndex(
                name: "IX_Posts_AlbumId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_MusicaId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Comentarios_UsuarioId",
                table: "Comentarios");

            migrationBuilder.DropColumn(
                name: "MusicaId",
                table: "Posts");
        }
    }
}
