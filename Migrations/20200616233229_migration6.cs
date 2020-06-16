using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Maia.Migrations
{
    public partial class migration6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Letras",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    MusicaId = table.Column<long>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    Idioma = table.Column<string>(maxLength: 5, nullable: true),
                    Texto = table.Column<string>(nullable: false),
                    TextoHtml = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Letras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Letras_Musicas_MusicaId",
                        column: x => x.MusicaId,
                        principalTable: "Musicas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Letras_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Partituras",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    MusicaId = table.Column<long>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    UrlPdf = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partituras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Partituras_Musicas_MusicaId",
                        column: x => x.MusicaId,
                        principalTable: "Musicas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Partituras_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tabs",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    MusicaId = table.Column<long>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    Texto = table.Column<string>(nullable: true),
                    TextoHtml = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tabs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tabs_Musicas_MusicaId",
                        column: x => x.MusicaId,
                        principalTable: "Musicas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tabs_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Letras_MusicaId",
                table: "Letras",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Letras_UsuarioId",
                table: "Letras",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Partituras_MusicaId",
                table: "Partituras",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Partituras_UsuarioId",
                table: "Partituras",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabs_MusicaId",
                table: "Tabs",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabs_UsuarioId",
                table: "Tabs",
                column: "UsuarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Letras");

            migrationBuilder.DropTable(
                name: "Partituras");

            migrationBuilder.DropTable(
                name: "Tabs");
        }
    }
}
