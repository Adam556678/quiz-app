using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models;

public class Question
{
    [Key]
    public int QnId { get; set; }

    [Column(TypeName ="nvarchar(250)")]
    public required string QnInWords { get; set; }

    [Column(TypeName ="nvarchar(50)")]
    public string? ImageName { get; set; }

    [Column(TypeName ="nvarchar(50)")]
    public required string Option1 { get; set; }

    [Column(TypeName ="nvarchar(50)")]
    public required string Option2 { get; set; }

    [Column(TypeName ="nvarchar(50)")]
    public required string Option3 { get; set; }

    [Column(TypeName ="nvarchar(50)")]
    public required string Option4 { get; set; }
 
    public int Answer { get; set; }

}
