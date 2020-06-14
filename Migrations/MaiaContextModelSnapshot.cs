﻿// <auto-generated />
using System;
using Maia.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Maia.Migrations
{
    [DbContext(typeof(MaiaContext))]
    partial class MaiaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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
                        .HasColumnType("bit");

                    b.Property<string>("Titulo")
                        .HasColumnType("text");

                    b.Property<string>("urlImagem")
                        .HasColumnType("text");

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
                        .HasColumnType("bit");

                    b.Property<string>("Biografia")
                        .HasColumnType("text");

                    b.Property<string>("Nome")
                        .HasColumnType("text");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("text");

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
                        .HasColumnType("bit");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<string>("Texto")
                        .HasColumnType("text");

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
                        .HasColumnType("bit");

                    b.Property<long?>("ComentarioId")
                        .HasColumnType("bigint");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.ToTable("Favoritos");
                });

            modelBuilder.Entity("Maia.Models.Musica", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<int?>("AlbumId")
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("DataLanc")
                        .HasColumnType("datetime");

                    b.Property<string>("Letra")
                        .HasColumnType("text");

                    b.Property<bool>("Single")
                        .HasColumnType("bit");

                    b.Property<string>("Titulo")
                        .HasColumnType("text");

                    b.Property<string>("urlImagem")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.ToTable("Musicas");
                });

            modelBuilder.Entity("Maia.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("DataPub")
                        .HasColumnType("datetime");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("QuantCmt")
                        .HasColumnType("int");

                    b.Property<int>("QuantFav")
                        .HasColumnType("int");

                    b.Property<string>("Tags")
                        .HasColumnType("text");

                    b.Property<string>("Texto")
                        .HasColumnType("text");

                    b.Property<string>("Titulo")
                        .HasColumnType("text");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Posts");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Post");
                });

            modelBuilder.Entity("Maia.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .HasColumnType("text");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("text");

                    b.HasKey("Id");

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

                    b.Property<int>("Nota")
                        .HasColumnType("int");

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

            modelBuilder.Entity("Maia.Models.Musica", b =>
                {
                    b.HasOne("Maia.Models.Album", null)
                        .WithMany("Musicas")
                        .HasForeignKey("AlbumId");
                });

            modelBuilder.Entity("Maia.Models.Post", b =>
                {
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
