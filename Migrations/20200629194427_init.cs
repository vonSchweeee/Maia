using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Maia.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Artistas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    Nome = table.Column<string>(nullable: true),
                    Biografia = table.Column<string>(nullable: true),
                    UrlImagem = table.Column<string>(nullable: true),
                    UrlSpotify = table.Column<string>(nullable: true),
                    QuantAcessos = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artistas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: false),
                    Nome = table.Column<string>(nullable: false),
                    Senha = table.Column<string>(nullable: false),
                    Role = table.Column<string>(nullable: true),
                    UrlImagem = table.Column<string>(nullable: true),
                    Ativo = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Albums",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    Titulo = table.Column<string>(nullable: false),
                    ArtistaId = table.Column<int>(nullable: false),
                    UrlImagem = table.Column<string>(nullable: true),
                    UrlSpotify = table.Column<string>(nullable: true),
                    DataLanc = table.Column<DateTime>(nullable: false),
                    QuantAcessos = table.Column<int>(nullable: false),
                    MediaNota = table.Column<byte>(nullable: false),
                    QuantAvaliacoes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Albums", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Albums_Artistas_ArtistaId",
                        column: x => x.ArtistaId,
                        principalTable: "Artistas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Musicas",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    Titulo = table.Column<string>(nullable: false),
                    Single = table.Column<bool>(nullable: false),
                    Faixa = table.Column<int>(nullable: true),
                    Duracao = table.Column<string>(maxLength: 8, nullable: true),
                    UrlImagem = table.Column<string>(nullable: true),
                    DataLanc = table.Column<DateTime>(nullable: false),
                    UrlSpotify = table.Column<string>(nullable: true),
                    UrlYoutube = table.Column<string>(nullable: true),
                    QuantAcessos = table.Column<int>(nullable: false),
                    MediaNota = table.Column<byte>(nullable: false),
                    QuantAvaliacoes = table.Column<int>(nullable: false),
                    AlbumId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Musicas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Musicas_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArtistaMusicas",
                columns: table => new
                {
                    ArtistaId = table.Column<int>(nullable: false),
                    MusicaId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtistaMusicas", x => new { x.ArtistaId, x.MusicaId });
                    table.ForeignKey(
                        name: "FK_ArtistaMusicas_Artistas_ArtistaId",
                        column: x => x.ArtistaId,
                        principalTable: "Artistas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArtistaMusicas_Musicas_MusicaId",
                        column: x => x.MusicaId,
                        principalTable: "Musicas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Letras",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    MusicaId = table.Column<long>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    Idioma = table.Column<string>(maxLength: 5, nullable: true),
                    Texto = table.Column<string>(nullable: false),
                    TextoHtml = table.Column<string>(nullable: true),
                    QuantAcessos = table.Column<int>(nullable: false)
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
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    MusicaId = table.Column<long>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    Titulo = table.Column<string>(maxLength: 90, nullable: true),
                    UrlPdf = table.Column<string>(nullable: false),
                    QuantAcessos = table.Column<int>(nullable: false)
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
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Titulo = table.Column<string>(nullable: true),
                    Texto = table.Column<string>(nullable: true),
                    QuantFav = table.Column<int>(nullable: false),
                    QuantCmt = table.Column<int>(nullable: false),
                    DataPub = table.Column<DateTime>(nullable: false),
                    Tags = table.Column<string>(nullable: true),
                    UsuarioId = table.Column<int>(nullable: false),
                    Ativo = table.Column<bool>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    Nota = table.Column<byte>(nullable: true),
                    MusicaId = table.Column<long>(nullable: true),
                    AlbumId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Posts_Musicas_MusicaId",
                        column: x => x.MusicaId,
                        principalTable: "Musicas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Posts_Usuarios_UsuarioId",
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
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    MusicaId = table.Column<long>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    Titulo = table.Column<string>(maxLength: 90, nullable: true),
                    Texto = table.Column<string>(nullable: true),
                    TextoHtml = table.Column<string>(nullable: true),
                    Afinacao = table.Column<string>(maxLength: 8, nullable: true),
                    Descricao = table.Column<string>(maxLength: 140, nullable: true),
                    QuantAcessos = table.Column<int>(nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Comentarios",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ativo = table.Column<bool>(nullable: false),
                    Texto = table.Column<string>(nullable: true),
                    UsuarioId = table.Column<int>(nullable: false),
                    PostId = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    ComentarioId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comentarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comentarios_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comentarios_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comentarios_Comentarios_ComentarioId",
                        column: x => x.ComentarioId,
                        principalTable: "Comentarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Favoritos",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UsuarioId = table.Column<int>(nullable: false),
                    PostId = table.Column<int>(nullable: false),
                    ComentarioId = table.Column<long>(nullable: true),
                    Ativo = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favoritos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favoritos_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Albums_ArtistaId",
                table: "Albums",
                column: "ArtistaId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtistaMusicas_MusicaId",
                table: "ArtistaMusicas",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_PostId",
                table: "Comentarios",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_UsuarioId",
                table: "Comentarios",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_ComentarioId",
                table: "Comentarios",
                column: "ComentarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_PostId",
                table: "Favoritos",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_UsuarioId_PostId",
                table: "Favoritos",
                columns: new[] { "UsuarioId", "PostId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Letras_MusicaId",
                table: "Letras",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Letras_UsuarioId",
                table: "Letras",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Musicas_AlbumId",
                table: "Musicas",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Partituras_MusicaId",
                table: "Partituras",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Partituras_UsuarioId",
                table: "Partituras",
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
                name: "IX_Posts_UsuarioId",
                table: "Posts",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabs_MusicaId",
                table: "Tabs",
                column: "MusicaId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabs_UsuarioId",
                table: "Tabs",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Email",
                table: "Usuarios",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArtistaMusicas");

            migrationBuilder.DropTable(
                name: "Comentarios");

            migrationBuilder.DropTable(
                name: "Favoritos");

            migrationBuilder.DropTable(
                name: "Letras");

            migrationBuilder.DropTable(
                name: "Partituras");

            migrationBuilder.DropTable(
                name: "Tabs");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Musicas");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Albums");

            migrationBuilder.DropTable(
                name: "Artistas");
        }
    }
}
