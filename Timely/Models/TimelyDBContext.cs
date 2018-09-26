using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Timely.Models
{
    public partial class TimelyDBContext : DbContext
    {
        public TimelyDBContext()
        {
        }

        public TimelyDBContext(DbContextOptions<TimelyDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<Sessions> Sessions { get; set; }
        public virtual DbSet<Tags> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost;Database=TimelyDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Projects>(entity =>
            {
                entity.HasKey(e => e.ProjectId);

                entity.Property(e => e.ProjectId).HasColumnName("PROJECT_ID");

                entity.Property(e => e.ActivatedAt)
                    .HasColumnName("activatedAt")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Sessions>(entity =>
            {
                entity.HasKey(e => e.SessionId);

                entity.Property(e => e.SessionId).HasColumnName("SESSION_ID");

                entity.Property(e => e.EndTime)
                    .HasColumnName("end_time")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Note)
                    .HasColumnName("note")
                    .HasColumnType("text");

                entity.Property(e => e.ProjectId).HasColumnName("Project_ID");

                entity.Property(e => e.StartTime)
                    .IsRequired()
                    .HasColumnName("start_time")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Sessions)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Sessions_Project");
            });

            modelBuilder.Entity<Tags>(entity =>
            {
                entity.HasKey(e => e.TagId);

                entity.Property(e => e.TagId).HasColumnName("TAG_ID");

                entity.Property(e => e.Duration).HasColumnName("duration");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SessionId).HasColumnName("Session_ID");

                entity.HasOne(d => d.Session)
                    .WithMany(p => p.Tags)
                    .HasForeignKey(d => d.SessionId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Tags_Session");
            });
        }
    }
}
