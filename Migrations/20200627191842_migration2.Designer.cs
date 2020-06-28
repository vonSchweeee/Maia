﻿// <auto-generated />
using System;
using Maia.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Maia.Migrations
{
    [DbContext(typeof(MaiaContext))]
    [Migration("20200627191842_migration2")]
    partial class migration2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Maia.Models.Album", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ArtistaId")
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("DataLanc")
                        .HasColumnType("datetime(6)");

                    b.Property<byte>("MediaNota")
                        .HasColumnType("tinyint unsigned");

                    b.Property<int>("QuantAcessos")
                        .HasColumnType("int");

                    b.Property<int>("QuantAvaliacoes")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UrlSpotify")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("ArtistaId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("Maia.Models.Artista", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Biografia")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Nome")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("QuantAcessos")
                        .HasColumnType("int");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UrlSpotify")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("Artistas");
                });

            modelBuilder.Entity("Maia.Models.ArtistaMusica", b =>
                {
                    b.Property<int>("ArtistaId")
                        .HasColumnType("int");

                    b.Property<long>("MusicaId")
                        .HasColumnType("bigint");

                    b.HasKey("ArtistaId", "MusicaId");

                    b.HasIndex("MusicaId");

                    b.ToTable("ArtistaMusica");
                });

            modelBuilder.Entity("Maia.Models.Comentario", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<string>("Texto")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Comentarios");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Comentario");
                });

            modelBuilder.Entity("Maia.Models.Favorito", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<long?>("ComentarioId")
                        .HasColumnType("bigint");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UsuarioId", "PostId")
                        .IsUnique();

                    b.ToTable("Favoritos");
                });

            modelBuilder.Entity("Maia.Models.Letra", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Idioma")
                        .HasColumnType("varchar(5) CHARACTER SET utf8mb4")
                        .HasMaxLength(5);

                    b.Property<long>("MusicaId")
                        .HasColumnType("bigint");

                    b.Property<int>("QuantAcessos")
                        .HasColumnType("int");

                    b.Property<string>("Texto")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("TextoHtml")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MusicaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Letras");
                });

            modelBuilder.Entity("Maia.Models.Musica", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<int?>("AlbumId")
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("DataLanc")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Duracao")
                        .HasColumnType("varchar(8) CHARACTER SET utf8mb4")
                        .HasMaxLength(8);

                    b.Property<int?>("Faixa")
                        .HasColumnType("int");

                    b.Property<byte>("MediaNota")
                        .HasColumnType("tinyint unsigned");

                    b.Property<int>("QuantAcessos")
                        .HasColumnType("int");

                    b.Property<int>("QuantAvaliacoes")
                        .HasColumnType("int");

                    b.Property<bool>("Single")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UrlSpotify")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UrlYoutube")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.ToTable("Musicas");
                });

            modelBuilder.Entity("Maia.Models.Partitura", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<long>("MusicaId")
                        .HasColumnType("bigint");

                    b.Property<int>("QuantAcessos")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .HasColumnType("varchar(90) CHARACTER SET utf8mb4")
                        .HasMaxLength(90);

                    b.Property<string>("UrlPdf")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MusicaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Partituras");
                });

            modelBuilder.Entity("Maia.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("DataPub")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("QuantCmt")
                        .HasColumnType("int");

                    b.Property<int>("QuantFav")
                        .HasColumnType("int");

                    b.Property<string>("Tags")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Texto")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Titulo")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Posts");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Post");
                });

            modelBuilder.Entity("Maia.Models.Tab", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Afinacao")
                        .HasColumnType("varchar(8) CHARACTER SET utf8mb4")
                        .HasMaxLength(8);

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Descricao")
                        .HasColumnType("varchar(140) CHARACTER SET utf8mb4")
                        .HasMaxLength(140);

                    b.Property<long>("MusicaId")
                        .HasColumnType("bigint");

                    b.Property<int>("QuantAcessos")
                        .HasColumnType("int");

                    b.Property<string>("Texto")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("TextoHtml")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Titulo")
                        .HasColumnType("varchar(90) CHARACTER SET utf8mb4")
                        .HasMaxLength(90);

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MusicaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Tabs");
                });

            modelBuilder.Entity("Maia.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Role")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Maia.Models.Resposta", b =>
                {
                    b.HasBaseType("Maia.Models.Comentario");

                    b.Property<long>("ComentarioId")
                        .HasColumnType("bigint");

                    b.HasIndex("ComentarioId");

                    b.HasDiscriminator().HasValue("Resposta");
                });

            modelBuilder.Entity("Maia.Models.Avaliacao", b =>
                {
                    b.HasBaseType("Maia.Models.Post");

                    b.Property<int?>("AlbumId")
                        .HasColumnType("int");

                    b.Property<long?>("MusicaId")
                        .HasColumnType("bigint");

                    b.Property<byte>("Nota")
                        .HasColumnType("tinyint unsigned");

                    b.HasIndex("AlbumId");

                    b.HasIndex("MusicaId");

                    b.HasDiscriminator().HasValue("Avaliacao");
                });

            modelBuilder.Entity("Maia.Models.Album", b =>
                {
                    b.HasOne("Maia.Models.Artista", "Artista")
                        .WithMany("Albuns")
                        .HasForeignKey("ArtistaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.ArtistaMusica", b =>
                {
                    b.HasOne("Maia.Models.Artista", "Artista")
                        .WithMany("ArtistasMusicas")
                        .HasForeignKey("ArtistaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Maia.Models.Musica", "Musica")
                        .WithMany("ArtistasMusicas")
                        .HasForeignKey("MusicaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Comentario", b =>
                {
                    b.HasOne("Maia.Models.Post", null)
                        .WithMany("Comentarios")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Maia.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Favorito", b =>
                {
                    b.HasOne("Maia.Models.Post", null)
                        .WithMany("Favoritos")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Letra", b =>
                {
                    b.HasOne("Maia.Models.Musica", "Musica")
                        .WithMany()
                        .HasForeignKey("MusicaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Maia.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Musica", b =>
                {
                    b.HasOne("Maia.Models.Album", null)
                        .WithMany("Musicas")
                        .HasForeignKey("AlbumId");
                });

            modelBuilder.Entity("Maia.Models.Partitura", b =>
                {
                    b.HasOne("Maia.Models.Musica", "Musica")
                        .WithMany()
                        .HasForeignKey("MusicaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Maia.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Post", b =>
                {
                    b.HasOne("Maia.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Tab", b =>
                {
                    b.HasOne("Maia.Models.Musica", "Musica")
                        .WithMany()
                        .HasForeignKey("MusicaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Maia.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Resposta", b =>
                {
                    b.HasOne("Maia.Models.Comentario", "Comentario")
                        .WithMany("Respostas")
                        .HasForeignKey("ComentarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Avaliacao", b =>
                {
                    b.HasOne("Maia.Models.Album", "Album")
                        .WithMany()
                        .HasForeignKey("AlbumId");

                    b.HasOne("Maia.Models.Musica", "Musica")
                        .WithMany()
                        .HasForeignKey("MusicaId");
                });
#pragma warning restore 612, 618
        }
    }
}
