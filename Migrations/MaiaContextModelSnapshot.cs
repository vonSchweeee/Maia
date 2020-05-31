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
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Maia.Models.Album", b =>
                {
                    b.Property<int>("AlbumId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ArtistaId")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .HasColumnType("text");

                    b.HasKey("AlbumId");

                    b.HasIndex("ArtistaId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("Maia.Models.Artista", b =>
                {
                    b.Property<int>("ArtistaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .HasColumnType("text");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("text");

                    b.HasKey("ArtistaId");

                    b.ToTable("Artistas");
                });

            modelBuilder.Entity("Maia.Models.Comentario", b =>
                {
                    b.Property<long>("ComentarioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<string>("Texto")
                        .HasColumnType("text");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("ComentarioId");

                    b.HasIndex("PostId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Comentarios");
                });

            modelBuilder.Entity("Maia.Models.Musica", b =>
                {
                    b.Property<long>("MusicaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<int?>("AlbumId")
                        .HasColumnType("int");

                    b.Property<int>("ArtistaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DataLanc")
                        .HasColumnType("datetime");

                    b.Property<string>("Letra")
                        .HasColumnType("text");

                    b.Property<bool>("Single")
                        .HasColumnType("bit");

                    b.Property<string>("Titulo")
                        .HasColumnType("text");

                    b.HasKey("MusicaId");

                    b.HasIndex("AlbumId");

                    b.HasIndex("ArtistaId");

                    b.ToTable("Musicas");
                });

            modelBuilder.Entity("Maia.Models.Post", b =>
                {
                    b.Property<int>("PostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AlbumId")
                        .HasColumnType("int");

                    b.Property<bool>("Avaliacao")
                        .HasColumnType("bit");

                    b.Property<DateTime>("DataPub")
                        .HasColumnType("datetime");

                    b.Property<long?>("MusicaId")
                        .HasColumnType("bigint");

                    b.Property<string>("Tags")
                        .HasColumnType("text");

                    b.Property<string>("Texto")
                        .HasColumnType("text");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("PostId");

                    b.HasIndex("AlbumId");

                    b.HasIndex("MusicaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Maia.Models.Resposta", b =>
                {
                    b.Property<long>("RespostaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long>("ComentarioId")
                        .HasColumnType("bigint");

                    b.Property<string>("Texto")
                        .HasColumnType("text");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("RespostaId");

                    b.HasIndex("ComentarioId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Respostas");
                });

            modelBuilder.Entity("Maia.Models.Usuario", b =>
                {
                    b.Property<int>("UsuarioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

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

                    b.HasKey("UsuarioId");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Maia.Models.Album", b =>
                {
                    b.HasOne("Maia.Models.Artista", "Artista")
                        .WithMany("Albuns")
                        .HasForeignKey("ArtistaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Comentario", b =>
                {
                    b.HasOne("Maia.Models.Post", "Post")
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

            modelBuilder.Entity("Maia.Models.Musica", b =>
                {
                    b.HasOne("Maia.Models.Album", null)
                        .WithMany("Musicas")
                        .HasForeignKey("AlbumId");

                    b.HasOne("Maia.Models.Artista", null)
                        .WithMany("Musicas")
                        .HasForeignKey("ArtistaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Maia.Models.Post", b =>
                {
                    b.HasOne("Maia.Models.Album", "Album")
                        .WithMany()
                        .HasForeignKey("AlbumId");

                    b.HasOne("Maia.Models.Musica", "Musica")
                        .WithMany()
                        .HasForeignKey("MusicaId");

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

                    b.HasOne("Maia.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
