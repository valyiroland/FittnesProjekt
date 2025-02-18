using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FitprojectAPI.Models;

public partial class FitprojectContext : DbContext
{
    public FitprojectContext()
    {
    }

    public FitprojectContext(DbContextOptions<FitprojectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<FitprojectBmi> FitprojectBmis { get; set; }

    public virtual DbSet<FitprojectCalory> FitprojectCalories { get; set; }

    public virtual DbSet<FitprojectCategory> FitprojectCategories { get; set; }

    public virtual DbSet<FitprojectIngredient> FitprojectIngredients { get; set; }

    public virtual DbSet<FitprojectPasswordreset> FitprojectPasswordresets { get; set; }

    public virtual DbSet<FitprojectRecipe> FitprojectRecipes { get; set; }

    public virtual DbSet<FitprojectRecipeIngredient> FitprojectRecipeIngredients { get; set; }

    public virtual DbSet<FitprojectUser> FitprojectUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=fitproject;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FitprojectBmi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fitproject_bmi");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.BmiValue)
                .HasPrecision(5)
                .HasColumnName("bmi_value");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.Height)
                .HasColumnType("int(11)")
                .HasColumnName("height");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.Weight)
                .HasPrecision(5)
                .HasColumnName("weight");

            entity.HasOne(d => d.User).WithMany(p => p.FitprojectBmis)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fitproject_bmi_ibfk_1");
        });

        modelBuilder.Entity<FitprojectCalory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fitproject_calories");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CalorieCount)
                .HasColumnType("int(11)")
                .HasColumnName("calorie_count");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.FitprojectCalories)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fitproject_calories_ibfk_1");
        });

        modelBuilder.Entity<FitprojectCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fitproject_categories");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<FitprojectIngredient>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fitproject_ingredients");

            entity.HasIndex(e => e.CategoryId, "category_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CalPer100g)
                .HasPrecision(5)
                .HasColumnName("cal_per_100g");
            entity.Property(e => e.CategoryId)
                .HasColumnType("int(11)")
                .HasColumnName("category_id");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("imageUrl");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasOne(d => d.Category).WithMany(p => p.FitprojectIngredients)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fitproject_ingredients_ibfk_1");
        });

        modelBuilder.Entity<FitprojectPasswordreset>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fitproject_passwordresets");

            entity.HasIndex(e => e.Email, "email");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.ExpiryTime)
                .HasColumnType("datetime")
                .HasColumnName("expiry_time");
            entity.Property(e => e.Token)
                .HasMaxLength(64)
                .HasColumnName("token");

            entity.HasOne(d => d.EmailNavigation).WithMany(p => p.FitprojectPasswordresets)
                .HasPrincipalKey(p => p.Email)
                .HasForeignKey(d => d.Email)
                .HasConstraintName("fitproject_passwordresets_ibfk_1");
        });

        modelBuilder.Entity<FitprojectRecipe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fitproject_recipes");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<FitprojectRecipeIngredient>(entity =>
        {
            entity.HasKey(e => new { e.RecipeId, e.IngredientId }).HasName("PRIMARY");

            entity.ToTable("fitproject_recipe_ingredients");

            entity.HasIndex(e => e.IngredientId, "ingredient_id");

            entity.Property(e => e.RecipeId)
                .HasColumnType("int(11)")
                .HasColumnName("recipe_id");
            entity.Property(e => e.IngredientId)
                .HasColumnType("int(11)")
                .HasColumnName("ingredient_id");
            entity.Property(e => e.Amount)
                .HasPrecision(5)
                .HasColumnName("amount");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.FitprojectRecipeIngredients)
                .HasForeignKey(d => d.IngredientId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fitproject_recipe_ingredients_ibfk_2");

            entity.HasOne(d => d.Recipe).WithMany(p => p.FitprojectRecipeIngredients)
                .HasForeignKey(d => d.RecipeId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fitproject_recipe_ingredients_ibfk_1");
        });

        modelBuilder.Entity<FitprojectUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fitproject_users");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Aktiv)
                .HasColumnType("int(1)")
                .HasColumnName("aktiv");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasColumnType("enum('male','female')")
                .HasColumnName("gender");
            entity.Property(e => e.Hash)
                .HasMaxLength(255)
                .HasColumnName("hash");
            entity.Property(e => e.Jogosultsag)
                .HasColumnType("int(1)")
                .HasColumnName("jogosultsag");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.RegisztracioDatum)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("datetime")
                .HasColumnName("regisztracio_datum");
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("salt");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
